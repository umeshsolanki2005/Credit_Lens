import urllib.request
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def do_req(url, data=None, token=None):
    headers = {'Content-Type': 'application/json'}
    if token:
        headers['Authorization'] = f'Bearer {token}'
    req = urllib.request.Request(url, data=data, headers=headers)
    try:
        with urllib.request.urlopen(req, context=ctx) as r:
            return r.code, r.read().decode('utf-8')
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode('utf-8')

print("Registering...")
code, body = do_req('http://127.0.0.1:8000/auth/register', json.dumps({'name':'test','email':'t9@t.com','password':'p','role':'borrower'}).encode('utf-8'))
print(code, body)

print("Logging in...")
code, body = do_req('http://127.0.0.1:8000/auth/login', json.dumps({'email':'t9@t.com','password':'p'}).encode('utf-8'))
if code == 200:
    token = json.loads(body)['token']
    print("Token:", token[:10], "...")
    
    print("Getting notifications...")
    code2, body2 = do_req('http://127.0.0.1:8000/borrower/notifications', token=token)
    print(code2, body2)
else:
    print("Login failed:", code, body)
