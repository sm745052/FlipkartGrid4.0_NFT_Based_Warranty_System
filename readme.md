**NFT based warranty implementation on Blockchain** by Tomp Comders

To run the backend **[The backend will deploy the contract]**
```sh
pip install -r requirements.txt
cd backend
brownie run scripts/app.py --network polygon-test
```
To run the refuel bot
```sh
cd backend
brownie run scripts/need.py --network polygon-test
```
To run the frontend
```sh
cd frontend
npm i
npm start
```


**Introduction**

An efficient approach to prove ownership of a product and claim its warranty has been
developed and deployed as a web application. The application consists of three parts,
frontend, backend, and smart contract. The smart contract has been deployed on the
polygon-mumbai testnet. The application has been designed to cater to customers and
brands with no knowledge of blockchain.

**Problems Faced**

1. Decaying an NFT automatically in the blockchain is not possible, some external
    trigger is necessary.
2. Paying gas prices by users can be hectic owing to the fact that they don't have
    expertise in blockchain.

**Features**

1. Login/Signup for customers and brands
2. Add to cart and buy option for customers
3. Purchase history for customers
4. Approve option for brands to create and transfer the NFT warranty using the
    serial number printed on the physical product and warranty validity months.
5. Transfer warranty to another customer
6. Transfer history of each warranty
7. Warranty data of a token_id (warranty id)
8. Owner verification by the brand during warranty claim

**Basic Approach**

Upon every signup, a new account address is created for the user. The private key
associated with the address is stored in the app and not disclosed to the user.

**Buying and selling procedure**

The customer adds items to the cart and clicks on buy. This sends an approval request
to the brand. While approving, the brand has to enter the serial number of the product
that is being sold along with the warranty months. This mints the warranty NFT and


transfers it to the customer. This can be seen in the customer purchase history and
present warranties.

**Product verification by the customer**

The customer can verify the authenticity of the product in two ways:

1. by accessing the transfer history of the warranty and verifying if the first account
    is of the brand.
2. by matching the serial number in the warranty with the serial number printed on
    the physical product.

**Transfer of warranty by customer**

The customer can transfer the warranty to another person via his/her account address.
The recipient again can then check the transfer history to verify the original brand of the
company and also match the product serial number.

**Warranty claim**

The customer can claim the warranty through an e-mail mentioning the warranty id and
account address to the brand from the registered mail id. The brand can then verify the
owner as well as the serial number of the product.

**Warranty decay**

The warranty decay has been achieved by a checkExpiry function in the smart contract.
The time of the first call is noted in the blockchain and then every time the warranty is
transferred, the checkExpiry function is invoked to validate the warranty. If the validity is
over, the warranty would be burnt. This function can be invoked at other endpoints also,
but it has been set at only one endpoint to reduce the cost due to the gas fee. Once the
warranty is burnt, it does not appear in the customer’s “present warranties” section and
the transfer history of such warranty ends at **address0.**

**Getting around gas fee**

Since the new account would have zero matic, after every signup, the account address
is added to a table “ **Needs”.** This table is being constantlymonitored by a **refuel bot**
that sends matic to the account addresses in need. The bot uses the main account as a
Matic source. Similarly, after every transaction, a function check_need is executed that
checks the balance and adds the account to the table if the balance is less than a


certain threshold. The present amount of matics in an account has been normalized to
the energy that varies between zero and one. If the energy is below 0.5, the customer is
warned that some transactions might not happen and is advised to wait till the refuel bot
refuels his/her account.


