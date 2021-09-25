from flask import Flask,render_template,jsonify
import requests
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

cred = credentials.Certificate('app/uber-cc11f-firebase-adminsdk-v8vj6-9d51966c93.json')

# Initialize the app with a service account, granting admin privileges
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://uber-cc11f-default-rtdb.firebaseio.com'
})

#Flaskオブジェクトの生成
app = Flask(__name__)

#23区の経度・緯度
tokyo_23 = {"千代田区":[139.4513,35.4138],"中央区":[139.4620,35.4015],"港区":[139.4506,35.3929],"新宿区":[139.4213,35.4138],
            "文京区":[139.4508,35.4229],"台東区":[139.4648,35.4246],"墨田区":[139.4806,35.4238],"江東区":[139.4902,35.4023],"品川区":[139.4349,35.3632],
            "目黒区":[139.4154,35.3829],"大田区":[139.4258,35.3341],"世田谷区":[139.3911,35.3846],"渋谷区":[139.4155,35.3951],"中野区":[139.3950,35.4227],
            "杉並区":[139.3811,35.4158],"豊島区":[139.4300,35.4334],"北区":[139.4401,35.4510],"荒川区":[139.4700,35.4410],
            "板橋区":[139.4234,35.4504],"練馬区":[139.3908,35.4408],"足立区":[139.4817,35.4630],"葛飾区":[139.5050,35.4436],
            "江戸川区":[139.5206,35.4242]}

#23区の端の経度・緯度(東京は大体1kmあたり、経度は0.011度、緯度は0.0090度)
##北極の緯度(35.4904)
##南極の緯度（35.3142）
##東極の経度（139.5507）
##西極の経度（139.3346）


#firebase
ref = db.reference('users')
#APIキー
headers = {
    'X-API-Key': 'ciCs66mDVE6OUlonzEs6R95ouMHi5sV7jiAPV0Hf',
}

###############
#下記、Route
@app.route("/")
def hello():
    return "Hello World"

#23区の気象情報を区単位で取得（23箇所）
@app.route("/get_23ku_weathers")
def get_23ku_weathers():
    ku_weathers = {}
    for ku in tokyo_23:
        params = (
            ('lat', tokyo_23[ku][1]),
            ('lon', tokyo_23[ku][0]),
        )
        response = requests.get('https://wxtech.weathernews.com/api/v1/ss1wx', headers=headers, params=params)
        ku_weathers[ku] = response.json()["wxdata"][0]['srf'][:10]#10時間分取得
    ref.set(ku_weathers)


    return ku_weathers

#23区の気象情報を1kmメッシュ単位で取得（400箇所）
@app.route("/get_400_weathers")
def get_630_weathers():
    return "未実装"

#データベースを元に、高単価地域を出力
@app.route("/show_money_location")
def show_money_location():
    return "未実装"


#現在地とデータベースを元に、高単価地域廻りの最適な順番を出力
@app.route("/show_money_route")
def show_money_route():
    return "未実装"

#現在地とデータベースを元に、快適な気温地域廻りの最適な順番を出力
@app.route("/show_comfortable_route")
def show_comfortable_route():
    return "未実装"



#おまじない
if __name__ == "__main__":
    app.run(debug=True)