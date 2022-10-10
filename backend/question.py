import pymysql
import numpy as np
import cv2
def web_select_specific(condition, user_id):
    conn = pymysql.connect(host = '127.0.0.1',
                       port = 3306,
                       user = 'qsweb',
                       passwd = '000000',
                       db = 'question_system',
                       charset='utf8')
    # cur = conn.cursor()
    cursor = conn.cursor()

    # into = "INSERT INTO `question` (`id`,`type`,`status`,`content`, `figure`, `selectA`, `selectB`, `selectC`, `selectD`, `hashtagA`, `hashtagB`, `hashtagC`, `ans`, `description`,`section_id`,`date`) VALUES (NULL, 0,0,%s,0, NULL,NULL,NULL,NULL, NULL,NULL,NULL,NULL, NULL,0,NULL);"
    into = "INSERT INTO `question` (`id`,`type`,`status`,`guidance_id`,`content`, `figure`, `selectA`, `selectB`, `selectC`, `selectD`, `hashtagA`, `hashtagB`, `hashtagC`, `ans`, `description`,`hint`,`section_id`,`date`,`user_id`,`radar1`,`radar2`,`radar3`,`radar4`,`radar5`) VALUES (NULL, %s,0,%s,%s,%s,%s, %s,%s,%s,%s, %s,%s,%s,%s, %s,0,NULL,%s,%s,%s,%s,%s,%s);"

# ['0', '3', '45345', '0', '1', '2', '3', '4', '5', '6', 'A', '', '7', '8']
    value2 = list(condition.values())
    print(len(value2))
    print(value2)
    if value2[0] == '0':
        values = (str(value2[0]), value2[1],value2[2],value2[14],value2[3],value2[4],value2[5],value2[6],   value2[11],value2[12],value2[13], value2[7], value2[9],value2[10],user_id, value2[15],value2[16],value2[17],value2[18],value2[19])
    else:
        values = (str(value2[0]), value2[1],value2[2],value2[14],value2[3],value2[4],value2[5],value2[6],   value2[11],value2[12],value2[13], value2[8], value2[9],value2[10],user_id, value2[15],value2[16],value2[17],value2[18],value2[19])
    # values = (value2[0], value2[1],str(pic['image'].read()),value2[2],value2[3],value2[4],value2[5],value2[6],value2[7],value2[8],value2[9],value2[10],value2[11])
    # print(value2)
    print(values)
    print(len(values))
    print(len(value2))

    # print(value2[14])
    # print(pic['image'].read())
    ### 還原圖片
    # picstr = pic['image'].read()
    # npimg = np.fromstring(picstr, np.uint8)
    # img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
    # cv2.imshow('URL2Image',img)   
    # cv2.waitKey()   

    ### 顯示還原的圖片
    # data =pic['image']
    # data.save('1.png')

    cursor.execute(into, values)
    conn.commit()

    return 0

def get_img():
    conn = pymysql.connect(host = '127.0.0.1',
                       port = 3306,
                       user = 'qsweb',
                       passwd = '000000',
                       db = 'question_system',
                       charset='utf8')
    # cur = conn.cursor()
    cursor = conn.cursor()
    ## 還原圖片

    into = "SELECT * FROM `question` WHERE `id` = 14"
      
    cursor.execute(into)
    content = cursor.fetchall()
    pic = content['figure']
    picstr = pic['image'].read()
    npimg = np.fromstring(picstr, np.uint8)
    img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
    cv2.imshow('URL2Image',img)   
    cv2.waitKey() 
    # data =pic['image']
    # data.save('2.png')

    return 0

def get_guidance(course_id = ""):
    conn = pymysql.connect(host = '127.0.0.1',
                       port = 3306,
                       user = 'qsweb',
                       passwd = '000000',
                       db = 'question_system',
                       charset='utf8')
    cur = conn.cursor()
    if course_id == "":
        sql = "select * from guidance"
    else:
        sql = "SELECT * FROM `guidance` WHERE `course_id` = '" + str(course_id) + "'"
    cur.execute(sql)
    content = cur.fetchall()
    dict = {}
    for data in content:
        #print(data)
        dict[data[6]] = {'EN_description':data[0],'CN_description':data[1],'EN_example':data[2],'CN_example':data[3],'course_id':data[4],'status':data[5],'guidance_id':data[6]}
    print(dict)
    return dict

def get_questions(course_id = ""):
    conn = pymysql.connect(host = '127.0.0.1',
                       port = 3306,
                       user = 'qsweb',
                       passwd = '000000',
                       db = 'question_system',
                       charset='utf8')
    cur = conn.cursor()
    if course_id == "":
        sql = "select * from `question`"
    else:
        sql = "SELECT * FROM `question` WHERE `course_id` = '" + course_id + "'"
    cur.execute(sql)
    content = cur.fetchall()
    dict = {}
    # `id`,`type`,`status`,`guidance_id`,`content`, `figure`, `selectA`, `selectB`, `selectC`, `selectD`, `hashtagA`, `hashtagB`, `hashtagC`, `ans`, `description`,`hint`,`section_id`,`date`)
    for data in content:
        #print(data)
        dict[data[0]] = {'id':data[0],'type':data[1],'status':data[2],'content':data[3],'figure':data[4],'selectA':data[5],'selectB':data[6],'selectC':data[7],'selectD':data[8],'hashtagA':data[9],'hashtagB':data[10],'hashtagC':data[11],'ans':data[12],'description':data[13],'section_id':data[14],'date':data[15],'guidance_id':data[16],'hint':data[17]}
        # dict[data[0]] = data
    # #print(dict)
    # return str(content[0][0])
    return dict

def get_questions_id(course_id = ""):
    conn = pymysql.connect(host = '127.0.0.1',
                       port = 3306,
                       user = 'qsweb',
                       passwd = '000000',
                       db = 'question_system',
                       charset='utf8')
    cur = conn.cursor()
    if course_id == "":
        sql = "select * from `question`"
    else:
        sql = "SELECT * FROM `question` WHERE `course_id` = '" + course_id + "'"
    cur.execute(sql)
    content = cur.fetchall()
    dict = {}
    # `id`,`type`,`status`,`guidance_id`,`content`, `figure`, `selectA`, `selectB`, `selectC`, `selectD`, `hashtagA`, `hashtagB`, `hashtagC`, `ans`, `description`,`hint`,`section_id`,`date`)
    for data in content:
        #print(data)
        dict[data[0]] = {'id':data[0],'type':data[1],'status':data[2],'content':data[3],'figure':data[4],'selectA':data[5],'selectB':data[6],'selectC':data[7],'selectD':data[8],'hashtagA':data[9],'hashtagB':data[10],'hashtagC':data[11],'ans':data[12],'description':data[13],'section_id':data[14],'date':data[15],'guidance_id':data[16],'hint':data[17]}
        # dict[data[0]] = data
    # #print(dict)
    # return str(content[0][0])
    return dict

def get_hashtag_list_all(question_id = ''):
    conn = pymysql.connect(host = '127.0.0.1',
                       port = 3306,
                       user = 'qsweb',
                       passwd = '000000',
                       db = 'question_system',
                       charset='utf8')
    
    cur = conn.cursor()
    if question_id == "":
        sql = "select * from `question`"
    else:
        sql = "SELECT * FROM `question` WHERE `id` = '" + str(question_id) + "'"
    cur.execute(sql)
    content = cur.fetchall()
    dict = {}
    hashtag_list = []
    dict_total_list_dict = {}
    # `id`,`type`,`status`,`guidance_id`,`content`, `figure`, `selectA`, `selectB`, `selectC`, `selectD`, `hashtagA`, `hashtagB`, `hashtagC`, `ans`, `description`,`hint`,`section_id`,`date`)
    for data in content:
        #print(data)
        question_id = data[0]
        # print(question_id)
        # dict[data[0]] = {'id':data[0],'hashtagA':data[9],'hashtagB':data[10],'hashtagC':data[11], 'section_id':data[14]}
        if data[9] != "":
            hashtag_list.append(data[9])
        if data[10] != "":
            hashtag_list.append(data[10])
        if data[11] != "":
            hashtag_list.append(data[11])
        # dict[data[0]] = data
        teacher_list = get_question_request_tags(data[14])
        all_class_list = get_score_tags(question_id) #+ hashtag_list
        # #print(dict)
        # return str(content[0][0])
        hashtag_list_total = hashtag_list + teacher_list + all_class_list

        dict_total = {}
        dict_total_list = []

        # 出題者
        for key in list(set(hashtag_list)):
            # a.count(key)
            times = hashtag_list_total.count(key)
            dict_total = {}
            dict_total["x"] = str(key)
            dict_total["value"] = times*1
            dict_total["category"] = '自評'
            # print(dict_total)
            dict_total_list.append(dict_total)
        # print(dict_total_list)
        # 全班
        for key in list(set(all_class_list)):
            # a.count(key)
            times = hashtag_list_total.count(key)
            dict_total = {}
            dict_total["x"] = key
            dict_total["value"] = times
            dict_total["category"] = '全班'
            dict_total_list.append(dict_total)
        # print(dict_total_list)
        #老師的
        for key in list(set(teacher_list)):
            # a.count(key)
            times = hashtag_list_total.count(key)
            dict_total = {}
            dict_total["x"] = key
            dict_total["value"] = times*2
            dict_total["category"] = '老師'
            dict_total_list.append(dict_total)
        # print(dict_total_list)
        # print(question_id)
        dict_total_list_dict.update({str(question_id): dict_total_list})
    # print(dict_total_list_dict)
    return ((dict_total_list_dict))

def get_question_request_tags(question_req_id):
    conn = pymysql.connect(host = '127.0.0.1',
            port = 3306,
            user = 'qsweb',
            passwd = '000000',
            db = 'question_system',
            charset='utf8')
    cur = conn.cursor()
    sql = "SELECT * FROM `question_request` WHERE `question_id_req` = "+ str(question_req_id) 
    # print(sql)
    # sql = "SELECT * FROM `question_request` WHERE `question_id_req` = 3"
    # print(sql)
    cur.execute(sql)
    content = cur.fetchall()
    dict = {}
    hashtag_list = []
    for question in content:
        dict[question[1]] = {'question_id_req':question[1],'hashtagA':question[3],'hashtagB':question[4],'hashtagC':question[5],'radarA':question[6],'radarB':question[7],'radarC':question[8],'radarD':question[9],'radarE':question[10]}
        if question[3] != "":
            hashtag_list.append(question[3])
        if question[4] != "":
            hashtag_list.append(question[4])
        if question[5] != "":
            hashtag_list.append(question[5])
    return hashtag_list

def get_score_tags(question_id):
    conn = pymysql.connect(host = '127.0.0.1',
            port = 3306,
            user = 'qsweb',
            passwd = '000000',
            db = 'question_system',
            charset='utf8')
    cur = conn.cursor()
    sql = "SELECT * FROM `score` WHERE `question_id` = "+ str(question_id) 
    # print(sql)
    # sql = "SELECT * FROM `question_request` WHERE `question_id_req` = 3"
    # print(sql)
    cur.execute(sql)
    content = cur.fetchall()
    dict = {}
    hashtag_list = []
    for question in content:
        dict[question[0]] = {'acore_id':question[0],'hashtagA':question[3],'hashtagB':question[4],'hashtagC':question[5],'radarA':question[6],'radarB':question[7],'radarC':question[8],'radarD':question[9],'radarE':question[10]}
        if question[3] != "":
            hashtag_list.append(question[3])
        if question[4] != "":
            hashtag_list.append(question[4])
        if question[5] != "":
            hashtag_list.append(question[5])
    return hashtag_list


def score_to_db(condition, id):
    conn = pymysql.connect(host = '127.0.0.1',
                       port = 3306,
                       user = 'qsweb',
                       passwd = '000000',
                       db = 'question_system',
                       charset='utf8')
    # cur = conn.cursor()
    cursor = conn.cursor()
    print(id)
    # into = "INSERT INTO `question` (`id`,`type`,`status`,`content`, `figure`, `selectA`, `selectB`, `selectC`, `selectD`, `hashtagA`, `hashtagB`, `hashtagC`, `ans`, `description`,`section_id`,`date`) VALUES (NULL, 0,0,%s,0, NULL,NULL,NULL,NULL, NULL,NULL,NULL,NULL, NULL,0,NULL);"
    into = "INSERT INTO `score` (`score_id`, `person_id`, `question_id`, `hashtagA`, `hashtagB`, `hashtagC`, `radar1`, `radar2`, `radar3`, `radar4`, `radar5`, `comments`, `date`) VALUES (NULL, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NULL)"
# "INSERT INTO `score` (`score_id`, `person_id`, `question_id`, `hashtagA`, `hashtagB`, `hashtagC`, `radar1`, `radar2`, `radar3`, `radar4`, `radar5`, `comments`, `date`) VALUES (NULL, '', '', '', '', '', '', '', '', '', '', '', NULL)"
# ['0', '3', '45345', '0', '1', '2', '3', '4', '5', '6', 'A', '', '7', '8']
    value2 = list(condition.values())
    values = (id, value2[0], value2[2],value2[3],value2[4],value2[5],value2[6],value2[7],value2[8],value2[9],value2[1])
    # if value2[0] == '0':
    #     values = (str(value2[0]), value2[1],value2[2],value2[14],value2[3],value2[4],value2[5],value2[6],value2[7],value2[8],value2[9],value2[10],value2[12],value2[13])
    # else:
    #     values = (str(value2[0]), value2[1],value2[2],value2[14],value2[3],value2[4],value2[5],value2[6],value2[7],value2[8],value2[9],value2[11],value2[12],value2[13])
    # values = (value2[0], value2[1],str(pic['image'].read()),value2[2],value2[3],value2[4],value2[5],value2[6],value2[7],value2[8],value2[9],value2[10],value2[11])
    # print(value2[10])
    # print(values)
    # print(len(value2))
    # print(values)


    cursor.execute(into, values)
    conn.commit()

    return 0