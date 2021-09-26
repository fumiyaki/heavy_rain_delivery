# -*- coding: utf-8 -*-
from flask import Flask,render_template,jsonify
import json
import random
import requests
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from geopy.distance import geodesic

cred = credentials.Certificate('app/uber-cc11f-firebase-adminsdk-v8vj6-aa847cfb1c.json')

# Initialize the app with a service account, granting admin privileges
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://uber-cc11f-default-rtdb.firebaseio.com'
})

#Flaskオブジェクトの生成
app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

#23区の経度・緯度
tokyo_23 = {"千代田区":[139.7536,35.6939],"中央区":[139.7722,35.6708],"港区":[139.7517,35.6581],"新宿区":[139.7036,35.6939],
            "文京区":[139.7522,35.7081],"台東区":[139.7800,35.7128],"墨田区":[139.8017,35.7106],"江東区":[139.8172,35.6731],"品川区":[139.7303,35.6089],
            "目黒区":[139.6983,35.6414],"大田区":[139.7161,35.5614],"世田谷区":[139.7161,35.6461],"渋谷区":[139.6986,35.6644],"中野区":[139.6639,35.7075],
            "杉並区":[139.6364,35.6994],"豊島区":[139.7167,35.7261],"北区":[139.7336,35.7528],"荒川区":[139.7833,35.7361],
            "板橋区":[139.7094,35.7511],"練馬区":[139.6522,35.7356],"足立区":[139.8047,35.7750],"葛飾区":[139.8472,35.7433],
            "江戸川区":[139.8683,35.7067]}
tokyo_23_ids = {1:"千代田区",2:"中央区",3:"港区",4:"新宿区",5:"文京区",6:"台東区",7:"墨田区",8:"江東区",9:"品川区",10:"目黒区",11:"大田区",
                12:"世田谷区",13:"渋谷区",14:"中野区",15:"杉並区",16:"豊島区",17:"北区",18:"荒川区",19:"板橋区",20:"練馬区",21:"足立区",22:"葛飾区",23:"江戸川区"}

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
    ku_num= 0
    for ku in tokyo_23:
        ku_num += 1
        params = (
            ('lat', tokyo_23[ku][1]),
            ('lon', tokyo_23[ku][0]),
        )
        response = requests.get('https://wxtech.weathernews.com/api/v1/ss1wx', headers=headers, params=params)
        ku_weathers[ku_num] = response.json()["wxdata"][0]['srf'][:10]#10時間分取得
    # firebase 登録
    ref.set(ku_weathers)

    return ku_weathers

# #23区の気象情報を1kmメッシュ単位で取得（400箇所）
# @app.route("/get_400_weathers")
# def get_400_weathers():
#     return "未実装"

################################################################
# # firebaseから引っ張ってくるコード
# ref.get()
############################################################

#データベースを元に、高単価地域を出力
@app.route("/show_money_locations")
def show_money_locations():
    #Firebaseからデータを取得
    result = ref.get()

    for ku in range(1, len(result)):
        ku_name = tokyo_23_ids[ku]
        for i in range(10):
            #体感インデックスを2つに分ける
            if result[ku][i]['feelidx']>=5:
                result[ku][i]['feelidx_hot']=result[ku][i]['feelidx']
                result[ku][i]['feelidx_cold']=None
            else:
                result[ku][i]['feelidx_hot']=None
                result[ku][i]['feelidx_cold']=result[ku][i]['feelidx']
            
            #いらない値を消す
            removed_value = result[ku][i].pop('wnddir')
            removed_value = result[ku][i].pop('wx')
            
            #区の名前を追加
            ku_prec = result[ku][i]['name']=tokyo_23_ids[ku]
        
            #アプリごとの価格倍率を算出
            ku_prec = result[ku][i]['prec']
            if ku_prec >= 60:
                result[ku][i]['uber_bonus']=6
                result[ku][i]['menu_bonus']=4
                result[ku][i]['foodpanda_bonus']=1
                result[ku][i]['didi_bonus']=4
            elif ku_prec >= 50:
                result[ku][i]['uber_bonus']=5
                result[ku][i]['menu_bonus']=4
                result[ku][i]['foodpanda_bonus']=1
                result[ku][i]['didi_bonus']=4
            elif ku_prec >= 40:
                result[ku][i]['uber_bonus']=4
                result[ku][i]['menu_bonus']=3
                result[ku][i]['foodpanda_bonus']=1
                result[ku][i]['didi_bonus']=3
            elif ku_prec >= 30:
                result[ku][i]['uber_bonus']=3
                result[ku][i]['menu_bonus']=3
                result[ku][i]['foodpanda_bonus']=1
                result[ku][i]['didi_bonus']=3
            elif ku_prec >= 20:
                result[ku][i]['uber_bonus']=2
                result[ku][i]['menu_bonus']=2
                result[ku][i]['foodpanda_bonus']=1
                result[ku][i]['didi_bonus']=2
            elif ku_prec >= 10:
                result[ku][i]['uber_bonus']=1
                result[ku][i]['menu_bonus']=2
                result[ku][i]['foodpanda_bonus']=1
                result[ku][i]['didi_bonus']=1
            else:
                result[ku][i]['uber_bonus']=0
                result[ku][i]['menu_bonus']=0
                result[ku][i]['foodpanda_bonus']=0
                result[ku][i]['didi_bonus']=0
            
            #頭痛（気圧変化）情報を追加
            if i ==9:
                result[ku][i]['headache']=None
            else:
                headache = abs(result[ku][i]['arpress']-result[ku][i+1]['arpress'])
                result[ku][i]['headache']=headache
            
            #花粉症情報を追加
            pollen = random.randint(0,10)
            result[ku][i]['pollen']=pollen
            
            #紫外線情報を追加
            uv = random.randint(0,10)
            result[ku][i]['uv']=uv
            
            #PM2.5情報を追加
            pm = random.randint(0,10)
            result[ku][i]['pm']=pm
            
            #黄砂情報を追加
            yello_sand = random.randint(0,10)
            result[ku][i]['yello_sand']=yello_sand
            
            #氾濫情報を追加
            flood = random.randint(0,10)
            result[ku][i]['flood']=flood

            #緯度経路を追加
            result[ku][i]['lat']=tokyo_23[ku_name][1]
            result[ku][i]['lon']=tokyo_23[ku_name][0]

    #変形
    result_list = []
    result_dict = {}
    for i in range(1,24):
        result_list.append(result[i])
    result_dict["data"] = result_list 
    result = json.dumps(result_dict, ensure_ascii=False)

    return result

#現在地とデータベースを元に、高単価地域廻りの最適な順番を出力
@app.route("/show_money_route",methods=["POST"])
def show_money_route():
    try:
        gps_location = request.json["gps_location"]
    except:
        gps_location = (35.6813, 139.7660)#東京都

    result = ref.get()

    raining_locations=[]
    money_route=[]

    for ku in result:
        #雨の地域だけを抽出
        if result[ku][0]['prec']>0:
            #1時間後にやむかどうか
            if result[ku][1]['prec'] == 0:
                stop_rain = -1
            else:
                stop_rain=0
            #現在地からの距離
            ku_name = tokyo_23_ids[ku]
            lon,lat=tokyo_23[ku_name]
            raining_location=(lat,lon)
            dis = geodesic(gps_location, raining_location).km
            if dis < 5:
                dis=5
            else:
                dis=10
            x = [dis,stop_rain,ku]
            raining_locations.append(x)

    sorted_list = sorted(raining_locations)

    #優先ルートをソートで算出
    for s in sorted_list:
        ku_num = s[2]
        ku_name = tokyo_23_ids[ku_num]
        money_route.append(tokyo_23[ku_name])
    
    return money_route

#現在地とデータベースを元に、快適な気温地域廻りの最適な順番を出力
@app.route("/show_comfortable_route",methods=["POST"])
def show_comfortable_route():
    try:
        gps_location = request.json["gps_location"]
    except:
        gps_location = (35.6813, 139.7660)#東京都

    result = ref.get()

    comfortable_locations=[]
    comfortable_route=[]

    for ku in result:
        if result[ku][0]['feelidx'] in [4,5]:
            if not result[ku][1]['feelidx'] in [4,5]:
                stop_comfortable = -1
            else:
                stop_comfortable = 0
            ku_name = tokyo_23_ids[ku]
            lon,lat=tokyo_23[ku_name]
            comfortable_location=(lat,lon)
            dis = geodesic(gps_location, comfortable_location).km
            if dis < 5:
                dis=5
            else:
                dis=10
            x = [dis,stop_comfortable,ku]
            comfortable_locations.append(x)

    sorted_list = sorted(comfortable_locations)

    for s in sorted_list:
        ku_num = s[2]
        ku_name = tokyo_23_ids[ku_num]
        comfortable_route.append(tokyo_23[ku_name])
    
    return comfortable_route

#おまじない
if __name__ == "__main__":
    app.run(debug=True)