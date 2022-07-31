import os
from flask import Flask, abort, request, jsonify
from scripts.deploy import deploy_contract
from brownie import accounts
import psycopg2
from dotenv import load_dotenv
from datetime import datetime
import json
from flask_cors import CORS, cross_origin
from scripts.sendmail import sendmail
from scripts.need import check_need
from brownie.network import priority_fee
priority_fee("auto")


load_dotenv(override=True)
app = Flask(__name__)
cors = CORS(app)



conn = psycopg2.connect(
    host=os.environ["HOST"],
    database=os.environ["DATABASE"],
    user=os.environ["USER"],
    password=os.environ["PASSWORD"],
)
contract = deploy_contract()
conn.autocommit = True

def timeConv(seconds):
    return datetime.fromtimestamp(seconds).strftime("%Y-%m-%d %H:%M:%S")
accounts.default = accounts.add("9c4e4025ac050f698dc3575b9ca028e7735cb00de1a6b98dfb568b0756c4407f")


# -------------------------------homepage-------------------------------------


@app.route("/")
def hello():
    return "Hello, World!"


@app.route("/brand")
def brand():
    return "brand page"


@app.route("/admin")
def admin():
    return "Admin page"


# -------------------------------normal methods--------------------------------

@app.route('/transferWarranty', methods=['POST'])
def transferWarranty():
    """
    Transfer warranty to another user
    """
    account_address = request.json["account_address"]
    to_address = request.json["to_address"]
    token_id = request.json["token_id"]
    global contract
    try:
        print("hello deaer")
        transaction = contract.transferWarranty.call(
            to_address, token_id, {"from": account_address}
        )
        tx = contract.transferWarranty(
            to_address, token_id, {"from": account_address}
        )
        tx.wait(1)
        cur = conn.cursor()
        check_need(account_address, cur)
    except Exception as e:
        abort(500, "error")
    transaction = contract.getTransferHistory(token_id, {"from": account_address})
    if(str(transaction[-1]) == "0x0000000000000000000000000000000000000000"):
        return jsonify({"status": "warranty expired"})
    return jsonify({"status": "success"})


@app.route('/items', methods=['GET'])
def getItems():
    """
    Get all items from the contract
    """
    global conn
    cur = conn.cursor()
    cur.execute(
        "SELECT * FROM items"
    )
    items = cur.fetchall()
    return jsonify(items)


@app.route('/addToCart', methods=['POST'])
def addToCart():
    """
    Add item to cart
    """
    account_address = request.json["account_address"]
    name = request.json["name"]
    price = request.json["price"]
    brand = request.json["brand"]
    cur = conn.cursor()
    picture = request.json["picture"]
    cur.execute('INSERT INTO cart (account_address, name, price, brand, picture) VALUES (%s, %s, %s, %s, %s)', (account_address, name, price, brand, picture))
    return jsonify({"status": "success"})

@app.route('/getCart', methods=['POST'])
def getCart():
    """
    Get cart
    """
    account_address = request.json["account_address"]
    cur = conn.cursor()
    cur.execute(
        "SELECT * FROM cart WHERE account_address = %s", (account_address,)
    )
    items = cur.fetchall()
    return jsonify(items)

@app.route('/buy', methods=['POST'])
def buy():
    """
    Buy items from cart
    """
    account_address = request.json["account_address"]
    cur = conn.cursor()
    print("hello")
    cur.execute(
        "SELECT * FROM cart WHERE account_address = %s", (account_address,)
    )
    cart_items = cur.fetchall()
    for i in cart_items:
        cur.execute('SELECT * FROM tmp_brands WHERE brand = %s', (i[2],))
        brand_address = cur.fetchone()[4]
        cur.execute("INSERT INTO orders (account_address, brand_address, brand, name, price, status) VALUES (%s, %s, %s, %s, %s, %s)", (account_address, brand_address, i[2], i[3], i[4], "pending", ))
    cur.execute(
        "DELETE FROM cart WHERE account_address = %s", (account_address,)
    )
    return jsonify({"status": "success"})



@app.route('/clearCart', methods=['POST'])
def clearCart():
    """
    Clear cart
    """
    account_address = request.json["account_address"]
    cur = conn.cursor()
    cur.execute(
        "DELETE FROM cart WHERE account_address = %s", (account_address,)
    )
    return jsonify({"status": "success"})


@app.route('/getOrders', methods = ['POST'])
def getMyOrders():
    """
    Get my orders
    """
    account_address = request.json["account_address"]
    cur = conn.cursor()
    cur.execute(
        "SELECT * FROM orders WHERE account_address = %s", (account_address,)
    )
    orders = cur.fetchall()
    return jsonify(orders)



@app.route('/getEnergy', methods=['POST'])
def getEnergy():
    cur = conn.cursor()
    energy = check_need(request.json["account_address"], cur)
    return jsonify({"energy": energy})

# return within 7 days (transfer back to brand, delete initial timestamp)
# transfer to another
# product details (sl no, past warranty, past owners, name, price, description)


@app.route('/warrantyData', methods=['POST'])
def warrantyData():
    """
    Get warranty details
    """
    account_address = request.json["account_address"]
    token_id = request.json["token_id"]
    global contract
    try:
        warranty_data = json.loads(contract.warrantyData(token_id, {"from": account_address}).replace("\'", "\""))
        warranty_start_time = contract.getWarrantyStartTime(token_id, {"from": account_address})
        warranty_validity = contract.getWarrantyValidity(token_id, {"from": account_address})
        warranty_end_time = warranty_start_time + warranty_validity
        warranty = {'token_id': token_id, 'warranty_start_time': timeConv(warranty_start_time), 'warranty_end_time': timeConv(warranty_end_time), 'warranty_validity': str(int(warranty_validity/(30*24*60*60))) + " months", 'data': warranty_data}
    except Exception as e:
        return jsonify({"status": "error", "message": "warranty expired"})
    return jsonify({"status": "success", "warranty": warranty})


@app.route('/listWarranties', methods=['POST'])
def list_warranties():
    """
    List warranties
    """
    account_address = request.json["account_address"]
    global contract
    transaction = contract.listWarranties(account_address, {"from": account_address})
    return jsonify({"warranties": transaction})


@app.route('/transferHistory', methods = ['POST'])
def getTransferHistory():
    '''
    Get transfer history of a user
    '''
    account_address = request.json["account_address"]
    token_id = request.json["token_id"]
    global contract
    try:
        transaction = contract.getTransferHistory(token_id, {"from": account_address})
        return jsonify({"status": "success", "transfers": transaction})
    except Exception as e:
        return jsonify({"status": "failure", "error": str(e)})

@app.route('/purchaseHistory', methods=['POST'])
def purchaseHistory():
    """
    Get purchase history of a user
    """
    account_address = request.json["account_address"]
    global contract
    transaction = list(contract.getPurchaseHistory(account_address, {"from": account_address}))
    for ind, i in enumerate(transaction):
        transaction[ind] = {'token_id': i[0], 'purchase_time': timeConv(i[1])}
    return jsonify({"purchases": transaction})
 

# -------------------------------brand methods--------------------------------


# @app.route("/brand/createWarranty", methods=["POST"])
# def create_warranty():
#     """
#     Create a warranty
#     """
#     account_address = request.json["account_address"]
#     account = accounts.at(account_address)
#     data = str(request.json["data"])
#     months = request.json["months"]
#     global contract
#     transaction = contract.create.call(data, int(months), {"from": account.address})
#     tx = contract.create(data, int(months), {"from": account.address})
#     tx.wait(1)
#     # token id
#     return jsonify({"tokenId": transaction})


# # sell warranty to customer after delivery


# @app.route("/brand/transferWarranty", methods=["POST"])
# def transfer_warranty():
#     """
#     Transfer warranty to customer
#     """
#     account_address = request.json["account_address"]
#     to_address = request.json["to_address"]
#     token_id = request.json["token_id"]
#     global contract
#     transaction = contract.transferWarranty(
#         to_address, token_id, {"from": account_address}
#     )
#     transaction.wait(1)
#     return jsonify({"status": "success"})


@app.route("/brand/approval", methods=["POST"])
def approval():
    """
    Approve order
    """
    account_address = request.json["account_address"]
    order_id = request.json['order_id']
    set_status = request.json['set_status']
    if set_status not in ['approved', 'rejected']:
        abort(500, 'set_status must be approved or rejected')
    cur = conn.cursor()
    if(set_status=="rejected"):
        cur.execute(
            "UPDATE orders SET status = %s WHERE id = %s", (set_status, order_id,)
        )
        return jsonify({"status": "success"})
    else:
        cur.execute(
            "UPDATE orders SET status = %s WHERE id = %s", ("waiting for blockchain confirmation", order_id,)
        )
    global contract
    cur.execute("select * from orders where id = %s", (order_id,))
    order = cur.fetchone()
    data = str(request.json["data"])
    months = request.json["months"]
    global contract
    transaction = contract.create.call(data, int(months), {"from": account_address})
    tx = contract.create(data, int(months), {"from": account_address})
    tx.wait(1)
    token_id = transaction
    to_address = order[1]
    transaction = contract.transferWarranty(
        to_address, token_id, {"from": account_address}
    )
    transaction.wait(1)
    check_need(account_address, cur)
    cur.execute("select * from tmp_customers where account_address = %s", (to_address,))
    customer = cur.fetchone()
    customer_mail_id = customer[1]
    cur.execute(
        "UPDATE orders SET status = %s WHERE id = %s", ("approved", order_id,)
    )
    try:
        sendmail(customer_mail_id, "NFT WARRANTY", "Your warranty has been approved token_id = {} and sent to your account address {} by {} [{}] valid for {} months".format(token_id, to_address, account_address, request.json["data"]["brand"], months))
    except Exception as e:
        print(e)
    return jsonify({"tokenId": token_id})



@app.route("/brand/getOrders", methods=["POST"])
def get_orders():
    """
    Get orders
    """
    account_address = request.json["account_address"]
    cur = conn.cursor()
    cur.execute(
        "SELECT * FROM orders WHERE brand_address = %s", (account_address,)
    )
    orders = cur.fetchall()
    return jsonify(orders)


# check product belongs to user


@app.route("/brand/checkProduct", methods=["POST"])
def check_product():
    """
    Check if product belongs to user
    """
    customer_address = request.json["customer_address"]
    account_address = request.json["account_address"]
    token_id = request.json["token_id"]
    global contract
    try:
        transaction = contract.getOwner.call(token_id, {"from": account_address})
        tx = contract.getOwner(token_id, {"from": account_address})
        tx.wait(1)
    except Exception as e:
        print(e)
        return jsonify({"status": "failure"})
    if str(transaction) == customer_address:
        return jsonify({"status": "success"})
    else:
        return jsonify({"status": "failure"})

@app.route('/brand/listWarranties', methods=['POST'])
def brand_list_warranties():
    """
    List warranties
    """
    account_address = request.json["account_address"]
    of = request.json["of"]
    global contract
    transaction = contract.listWarranties(of, {"from": account_address})
    return jsonify({"warranties": transaction})


# warranty record update


# -------------------------------admin methods-------------------------------


# @app.route('/admin/addBrand', methods=['POST'])
# def add_brand():
#     """
#     Add a brand
#     """
#     account_address = request.json["account_address"]
#     brand_address = request.json["brand_address"]
#     global contract
#     transaction = contract.add_brand(brand_address, {"from": account_address})
#     transaction.wait(1)
#     return jsonify({"status": "success"})

# @app.route("/admin/awardItem")
# def award_item():
#     global contract
#     transaction = contract.awardItem(accounts[1], 100, {"from": accounts[0]})
#     transaction.wait(1)
#     return str(transaction.return_value)


# ----------------------login signup------------------------------


@app.route("/login", methods=["POST"])
def login():
    """
    requires:
    {
        "email": "",
        "password": ""
    }
    """
    data = request.get_json()
    email = data["email"]
    password = data["password"]
    cur = conn.cursor()
    cur.execute(
        "SELECT * FROM tmp_customers WHERE email = %s AND password = %s", (email, password)
    )
    customer = cur.fetchone()
    if customer:
        account = accounts.add(customer[5])
        print(account.address, "customer <---> joined")
        check_need(account.address, cur)
        return jsonify({"success": True, "customer": customer[:4]})
    else:
        abort(500, 'customer not found') 


@app.route("/brand/login", methods=["POST"])
def brand_login():
    """
    requires:
    {
        "email": "",
        "password": ""
    }
    """
    data = request.get_json()
    email = data["email"]
    password = data["password"]
    cur = conn.cursor()
    cur.execute(
        "SELECT * FROM tmp_brands WHERE email = %s AND password = %s", (email, password)
    )
    brand_obj = cur.fetchone()
    if brand_obj:
        account = accounts.add(brand_obj[6])
        print(account.address, "brand <---> joined")
        check_need(account.address, cur)
        return jsonify({"success": True, "brand_obj": brand_obj[:5]})
    else:
        abort(500, 'brand not found') 


@app.route("/admin/login", methods=["POST"])
def admin_login():
    pass


@app.route("/signup", methods=["POST"])
def signup():
    """
    post request to signup
    email: string
    password: string
    account_address: string
    """
    email = request.json["email"]
    password = request.json["password"]
    account = accounts.add()
    account_address = str(account.address)
    public_key = str(account.public_key)
    private_key = str(account.private_key)
    # account_address = request.json["account_address"]
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO tmp_customers (email, password, account_address, public_key, private_key) VALUES (%s, %s, %s, %s, %s)",
        (email, password, account_address, public_key, private_key, ),
    )
    check_need(account_address, cursor)
    return {"account_address": account_address}


@app.route("/brand/signup", methods=["POST"])
def brand_signup():
    # account_address = request.json["account_address"]
    email = request.json["email"]
    password = request.json["password"]
    brand = request.json["brand"]
    account = accounts.add()
    account_address = str(account.address)
    public_key = str(account.public_key)
    private_key = str(account.private_key)
    global contract
    transaction = contract.add_brand(account_address, {"from": accounts.default.address})
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO tmp_brands (email, password, account_address, brand, public_key, private_key) VALUES (%s, %s, %s, %s, %s, %s)",
        (email, password, account_address, brand, public_key, private_key, ),
    )
    check_need(account_address, cursor)
    print(cursor.execute("SELECT * FROM tmp_brands"))
    return "done"



# --------------------------------------------------------------------------


def development_adjustments():
    cur = conn.cursor()
    cur.execute("SELECT * FROM tmp_customers")
    customers = cur.fetchall()
    for customer in customers:
        account = accounts.add(customer[5])
        print(account.address, " customer <---> joined")
    cur.execute("SELECT * FROM tmp_brands")
    brands = cur.fetchall()
    for brand in brands:
        account = accounts.add(brand[6])
        global contract
        transaction = contract.add_brand(account.address, {"from": accounts.default.address})
        check_need(account.address, cur)
        print(account.address, "brand <---> joined")





def main():
    development_adjustments()
    print(list(accounts))
    global contract
    print("hello")
    app.run()
