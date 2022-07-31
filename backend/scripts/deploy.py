from brownie import accounts, Warranties
from dotenv import load_dotenv


def deploy_contract():
    account = accounts.add("9c4e4025ac050f698dc3575b9ca028e7735cb00de1a6b98dfb568b0756c4407f")
    accounts.default = account
    contract = Warranties.deploy({'from': account})
    return contract

def main():
    load_dotenv(override=True)
    contract = deploy_contract()
    print(contract)