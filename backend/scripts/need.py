import os
from brownie import accounts
import os
import psycopg2
from dotenv import load_dotenv
import time

thresold = 200000000000000000


def check_need(account, cur):
    print(account, " account balance", accounts.at(account).balance())
    energy = (accounts.at(account).balance()/thresold)/2
    if(energy > 1):
        energy = 1
    if(accounts.at(account).balance()<thresold):
        cur.execute("SELECT * FROM need WHERE account_address = %s", (account,))
        res = cur.fetchall()
        if(res is None):
            return energy
        cur.execute("INSERT INTO need (account_address, status) VALUES (%s, %s)", (account, 'pending'))
        return energy
    return energy


def main():
    bot_account = accounts.add("9c4e4025ac050f698dc3575b9ca028e7735cb00de1a6b98dfb568b0756c4407f")  # todo
    print(bot_account.balance())
    load_dotenv(override=True)
    conn = psycopg2.connect(
        host=os.environ["HOST"],
        database=os.environ["DATABASE"],
        user=os.environ["USER"],
        password=os.environ["PASSWORD"],
    )
    conn.autocommit = True
    cur = conn.cursor()
    while(True):
        cur.execute("SELECT * FROM need WHERE status = %s", ('pending',))
        needer = cur.fetchone()
        if(needer is None):
            continue
        bot_account.transfer(needer[1], thresold)
        cur.execute("UPDATE need SET status = %s WHERE account_address = %s", ('done', needer[1]))
        time.sleep(60)