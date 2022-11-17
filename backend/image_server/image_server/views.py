from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse




@csrf_exempt
def test(request):
    if request.method=='GET':
        return JsonResponse(test_obj("random number"), safe=False)

def extracted_gifticon_info(idx, name, number, expirationDate):
    return {
        "idx": idx,
        "name": name,
        "number": number,
        "expirationDate": expirationDate
    }

import pytesseract
import cv2 
from PIL import Image
def extract_gifticon_info(img):
    
    img_text = pytesseract.image_to_string(img, lang='Hangul+eng', config=r'--oem 3 --psm 4 preserve_interword_spaces=0')

#     print("=-=-=-=-=-=-=-=-=-[ 이미지 텍스트 추출 결과 ]=-=-=-=-=-=-=-=-=-\n")
#     print(img_text)
#     print("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-")

    import re;
    
    img_text_arr = img_text.split("\n")

    ### << 유효 기간 추출 >>
    # coupon_expiration_date_regex = '\d{4}[/\\.]\d{2}[/\\.]\d{2}'
    coupon_expiration_date_regex = '\d{4}\D\d{2}\D\d{2}'
    pattern_expiration_date = re.compile(coupon_expiration_date_regex)
    expiration_date = ""
    expiration_date_line = 0
    for line in img_text_arr:
        expiration_date_data = pattern_expiration_date.findall(line.replace(" ",""))
        if len(expiration_date_data)>0 : 
            expiration_date = expiration_date_data[0]
            break
        expiration_date_line+=1
   
    if expiration_date=="": raise ValueError('유효기간 추출 실패')
    expiration_date = expiration_date_data[0]
    expiration_date = re.sub(r'\D', '/', expiration_date) # 형식 통일


    # 유효 기간 연, 월, 일 따로 저장 
    splited_date = expiration_date.split("/")
    exp_year = splited_date[0]
    exp_month = splited_date[1]
    exp_day = splited_date[2]


    ### << 쿠폰 번호 추출 >>
    coupon_number_regex = r'\d{4}[-\s]*\d{4}[-\s]*\d{4}[-\s]*\d{0,4}'
    pattern_coupon_number = re.compile(coupon_number_regex)
    coupon_number = ""
    coupon_number_line = 0
    for line in img_text_arr:
        coupon_number_data = pattern_coupon_number.findall(line)
        if len(coupon_number_data)>0:
            coupon_number = coupon_number_data
            break
        coupon_number_line+=1
   
    if expiration_date=="": raise ValueError('쿠폰번호 추출 실패')
    coupon_number = coupon_number_data[0].strip()

    coupon_number = re.sub(r'\D', '', coupon_number) # 형식 통일
    # coupon_number = coupon_number.replace(" ","-") # 형식 통일
    
    
    ### << 상품명 추출 >>
    item_name = ""
    # 
    cut_keyword = ["유효","사용처"] 
    flag = False
    for i in range(0,min(expiration_date_line,coupon_number_line)):
        line = img_text_arr[i].replace(" ","")
#         print(line)
        if item_name in line:item_name="" # 로고 인식 방지
        for keyword in cut_keyword:
            if keyword in line: flag=True
        if flag:break
        if line != "":
            item_name += line
            
    print("\n\n [ 기프티콘 정보 추출 결과 ] \n")
    print("item name \t\t", item_name.replace(" ",""))
    print("expiration date \t",expiration_date)
    print("coupon number \t\t",coupon_number)
    print("\n\n\n")
    res = dict([])
    res["itemName"] = item_name
    res["expirationDate"] = expiration_date
    res["couponNumber"] = coupon_number
    return res


import base64
import io
import numpy as np

def stringToRGB(base64_string):
    print("## CHECK 1")
    imgdata = base64.b64decode(base64_string)
    print("### CHECK 2")
    dataBytesIO = io.BytesIO(imgdata)
    print("#### CHECK 3")
    image = Image.open(dataBytesIO)
    return cv2.cvtColor(np.array(image), cv2.COLOR_BGR2RGB)

@csrf_exempt
def get_validated_gifticon(request):
    if request.method=='POST':
        req = JSONParser().parse(request)
        image_list = req['images'] # Base64 배열
        # image_list = JSONParser().parse(image_data)
    
        # for image_str in image_list:
        #     print(image_str)
        # return JsonResponse(image_data+"잘 받았수다.", safe=False)
        res = []
        idx = 0
        for base64_str in image_list :
            # 이미지 처리 로직
            base64_string = base64_str.split(",")[1]
            # print(base64_string)
            try:
                img = stringToRGB(base64_string)
                extracted_data = extract_gifticon_info(img)
                res.append(extracted_gifticon_info(idx, extracted_data["itemName"], extracted_data["couponNumber"], extracted_data["expirationDate"]))
            except Exception as e:
                print()
                # res.append("error : "+ str(e))
            idx+=1
        print("RES:",str(res))
        return JsonResponse(res, safe=False)

# @csrf_exempt
# def recommend_cf_api(request):
#     return JsonResponse('NONE', safe=False)
#     # if request.method=='POST':
#     #     user_id = JSONParser().parse(request)['id']
#     #     print(user_id)
#     #     return JsonResponse(recommend_by_SGD(user_id), safe=False)

# def test_obj(str):
#     return {
#         "gifticon" : 123,
#         "number" : str
#     }

# @csrf_exempt
# def get_recommend_by_nutrients_api(request):
#     if request.method=='POST':


#         return JsonResponse(get_recipe_by_nutrients(user_id, period), safe=False)

# @csrf_exempt
# def get_recommend_by_refrigerator_api(request):
#     if request.method=='POST':
#         req = JSONParser().parse(request)
#         user_id = req['user_id']
#         return JsonResponse(get_recipe_by_refrigerator(user_id), safe=False)
