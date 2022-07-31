import sys
import os
import re
from dotenv import load_dotenv
load_dotenv()
from smtplib import SMTP_SSL as SMTP       # this invokes the secure SMTP protocol (port 465, uses SSL)
def sendmail(destination, subject, message):
    SMTPserver = 'smtp.gmail.com'
    sender = os.environ['MAIL_SENDER']
    destination = [destination]

    USERNAME = os.environ['MAIL_SENDER']
    PASSWORD = os.environ['MAIL_PASSWORD']

    # typical values for text_subtype are plain, html, xml
    text_subtype = 'plain'


    content=message
    # from smtplib import SMTP                  # use this for standard SMTP protocol   (port 25, no encryption)

    # old version
    # from email.MIMEText import MIMEText
    from email.mime.text import MIMEText

    try:
        msg = MIMEText(content, text_subtype)
        msg['Subject']=       subject
        msg['From']   = sender # some SMTP servers will do this automatically, not all

        conn = SMTP(SMTPserver)
        conn.set_debuglevel(False)
        conn.login(USERNAME, PASSWORD)
        try:
            conn.sendmail(sender, destination, msg.as_string())
        finally:
            conn.quit()

    except Exception as e:
        print(e)