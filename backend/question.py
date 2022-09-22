import pymysql
import numpy as np
import cv2
def web_select_specific(condition, pic):
    conn = pymysql.connect(host = '127.0.0.1',
                       port = 3306,
                       user = 'qsweb',
                       passwd = '000000',
                       db = 'question_system',
                       charset='utf8')
    # cur = conn.cursor()
    cursor = conn.cursor()

    # into = "INSERT INTO `question` (`id`,`type`,`status`,`content`, `figure`, `selectA`, `selectB`, `selectC`, `selectD`, `hashtagA`, `hashtagB`, `hashtagC`, `ans`, `description`,`section_id`,`date`) VALUES (NULL, 0,0,%s,0, NULL,NULL,NULL,NULL, NULL,NULL,NULL,NULL, NULL,0,NULL);"
    into = "INSERT INTO `question` (`id`,`type`,`status`,`guidance_id`,`content`, `figure`, `selectA`, `selectB`, `selectC`, `selectD`, `hashtagA`, `hashtagB`, `hashtagC`, `ans`, `description`,`hint`,`section_id`,`date`) VALUES (NULL, %s,0,%s,%s,%s,%s, %s,%s,%s,%s, %s,%s,%s,%s, %s,0,NULL);"

# ['0', '3', '45345', '0', '1', '2', '3', '4', '5', '6', 'A', '', '7', '8']
    value2 = list(condition.values())
    if value2[0] == '0':
        values = (str(value2[0]), value2[1],value2[2],value2[14],value2[3],value2[4],value2[5],value2[6],value2[7],value2[8],value2[9],value2[10],value2[12],value2[13])
    else:
        values = (str(value2[0]), value2[1],value2[2],value2[14],value2[3],value2[4],value2[5],value2[6],value2[7],value2[8],value2[9],value2[11],value2[12],value2[13])
    # values = (value2[0], value2[1],str(pic['image'].read()),value2[2],value2[3],value2[4],value2[5],value2[6],value2[7],value2[8],value2[9],value2[10],value2[11])
    # print(value2[10])
    # print(values)
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
        sql = "SELECT * FROM `guidance` WHERE `course_id` = '" + course_id + "'"
    cur.execute(sql)
    content = cur.fetchall()
    dict = {}
    for data in content:
        #print(data)
        dict[data[6]] = {'EN_description':data[0],'CN_description':data[1],'EN_example':data[2],'CN_example':data[3],'course_id':data[4],'status':data[5],'guidance_id':data[6]}
    #print(dict)
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

