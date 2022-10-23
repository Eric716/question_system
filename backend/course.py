import pymysql
import numpy as np
from backend.user import get_dict_users
# get annual sales rank
def get_dict_course(name=None):
    conn = pymysql.connect(host = '127.0.0.1',
                       port = 3306,
                       user = 'qsweb',
                       passwd = '000000',
                       db = 'question_system',
                       charset='utf8')
    cur = conn.cursor()
    if name==None or name =="reporter":
        sql = "select * from courses"
    else:
        sql = "SELECT * FROM `courses` WHERE `user_id` = '" + name + "'"
    #sql = "select * from courses"
    cur.execute(sql)
    content = cur.fetchall()
    dict = {}
    for data in content:
        dict[data[0]] = {'course_name':data[2],'teacher':data[1]}

    return dict

def trans_course(course_id):
    dict = get_dict_course()
    for id in dict:
        if id == int(course_id):
            #print("check")
            return dict[id]['course_name']
def course_selection(action,course_id,student_id):
    conn = pymysql.connect(host = '127.0.0.1',
                    port = 3306,
                    user = 'qsweb',
                    passwd = '000000',
                    db = 'question_system',
                    charset='utf8')
    cur = conn.cursor()
    if action=='remove':
        sql = "DELETE FROM `course_selection_list` WHERE `course_id`='"+course_id+"' and `student_id`='"+student_id+"';"
    elif action=='add':
        sql = "INSERT INTO `course_selection_list` (`id`, `course_id`, `student_id`) VALUES (NULL, '"+course_id+"', '"+student_id+"');"
    #print(sql)
    cur.execute(sql)
    conn.commit()

    return 'ok'
def get_guidance(course_id=''):
    conn = pymysql.connect(host = '127.0.0.1',
            port = 3306,
            user = 'qsweb',
            passwd = '000000',
            db = 'question_system',
            charset='utf8')
    cur = conn.cursor()

    if course_id == '':
        sql = "SELECT * FROM `guidance` "
    else:
        sql = "SELECT * FROM `guidance` WHERE `course_id` = '" + str(course_id) + "'"
    cur.execute(sql)
    content = cur.fetchall()
    dict = {}
    for guide in content:
        dict[guide[6]] = {'en_description':guide[0],'ch_description':guide[1],'en_example':guide[2],'ch_example':guide[3]}
    conn.commit()
    
    return dict
def add_guidance(course_id,EN_description,CN_description,EN_example,CN_example):
    conn = pymysql.connect(host = '127.0.0.1',
                port = 3306,
                user = 'qsweb',
                passwd = '000000',
                db = 'question_system',
                charset='utf8')

    if EN_description.strip()== "" and CN_description.strip() == "" and EN_example.strip() == "" and CN_example.strip() =="":
        return "資料不可空白！"
    cur = conn.cursor()
    sql =  "INSERT INTO `guidance` (`status`,`course_id`, `EN_description`, `CN_description`,`EN_example`,`CN_example`) VALUES (0, '"+course_id+"', '"+EN_description+"', '"+CN_description+"', '"+EN_example+"', '"+CN_example+"');"

    cur.execute(sql)
    conn.commit()
    return 'ok'
def add_question(data):
    title = data['title']
    course_id = data['course_id']
    hashtagA = data['hashtagA']
    hashtagB = data['hashtagB']
    hashtagC = data['hashtagC']
    radarA = data['radarA']
    radarB = data['radarB']
    radarC = data['radarC']
    radarD = data['radarD']
    radarE = data['radarE']
    for key in data:
        if data[key].strip() == "":
            return "請輸入完整資料！"
    conn = pymysql.connect(host = '127.0.0.1',
                port = 3306,
                user = 'qsweb',
                passwd = '000000',
                db = 'question_system',
                charset='utf8')
    cur = conn.cursor()
    sql =  "INSERT INTO `question_request` (`course_id`, `question_id_req`, `question_type`, `hashtag1`, `hashtag2`, `hashtag3`, `radar1`, `radar2`, `radar3`, `radar4`, `radar5`,`title`) VALUES (%s,NULL,0,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
    values = (course_id,hashtagA,hashtagB,hashtagC,radarA,radarB,radarC,radarD,radarE,title)
    cur.execute(sql, values)
    conn.commit()
    return 'ok'
def list_question(data):
    # print(data)
    conn = pymysql.connect(host = '127.0.0.1',
            port = 3306,
            user = 'qsweb',
            passwd = '000000',
            db = 'question_system',
            charset='utf8')
    cur = conn.cursor()
    if data=={}:
        sql = "SELECT * FROM `question_request` "
    else:
        course_id = data['course_id']
    # print(course_id)
        sql = "SELECT * FROM `question_request` WHERE `course_id` = '" + str(course_id) + "'"
    cur.execute(sql)
    content = cur.fetchall()
    dict = {}

    for question in content:
        dict[question[1]] = {'course_name':trans_course(question[0]),'question_id':question[1],'hashtagA':question[3],'hashtagB':question[4],'hashtagC':question[5],'radarA':question[6],'radarB':question[7],'radarC':question[8],'radarD':question[9],'radarE':question[10],'title':question[11]}
    return dict
def get_question_request_tags(question_req_id):
    conn = pymysql.connect(host = '127.0.0.1',
            port = 3306,
            user = 'qsweb',
            passwd = '000000',
            db = 'question_system',
            charset='utf8')
    cur = conn.cursor()
    sql = "SELECT * FROM `question_request` WHERE `question_req_id` = '" + str(question_req_id) + "'"
    cur.execute(sql)
    content = cur.fetchall()
    dict = {}

    for question in content:
  
        dict[question[1]] = {'course_name':trans_course(question[0]),'question_id':question[1],'hashtagA':question[3],'hashtagB':question[4],'hashtagC':question[5],'radarA':question[6],'radarB':question[7],'radarC':question[8],'radarD':question[9],'radarE':question[10],'title':question[11]}

    return dict
def listing_question_response(data,user_id):
    question_req_id = data['question_req_id']
    conn = pymysql.connect(host = '127.0.0.1',
            port = 3306,
            user = 'qsweb',
            passwd = '000000',
            db = 'question_system',
            charset='utf8')
    cur = conn.cursor()
    user_dict = get_dict_users()
    if user_dict[user_id]["permission"]=='student':
        sql = "SELECT * FROM `question` WHERE `section_id` = '" + str(question_req_id) +"'"# and `user_id`='"+user_id+"';"
    else:    
        sql = "SELECT * FROM `question` WHERE `section_id` = '" + str(question_req_id) + "'"
    cur.execute(sql)
    content = cur.fetchall()
    dict = {}
    lst = ['id','type','status','content','figure','selectA','selectB','selectC','selectD','hashtagA','hashtagB','hashtagC','ans','description','hint','user_id','radar1','radar2','radar3','radar4','radar5']
    # print(content)
    for question in content:
  
        dict[question[0]] = {}
        i = 0
        for col in lst:
            if i >= 14:
                dict[question[0]][col] = question[i+3]
            else:
                dict[question[0]][col] = question[i]
            i+=1
        dict[question[0]]['guidance_id'] = question[16]
        dict[question[0]]['section_id'] = question[14]
        if (user_id ==  question[18]):
            dict[question[0]]['delete_permission'] = 'yes'
        else:
            dict[question[0]]['delete_permission'] = 'no'
    return dict
def getting_scores_mean(data):
    #question_req_id = data['question_req_id']
    question_id = data['question_id']
    conn = pymysql.connect(host = '127.0.0.1',
            port = 3306,
            user = 'qsweb',
            passwd = '000000',
            db = 'question_system',
            charset='utf8')
    cur = conn.cursor()
    sql = "SELECT * FROM `score` WHERE `question_id` = '" + str(question_id) + "'"
    cur.execute(sql)
    content = cur.fetchall()
    temp_list1 = []
    temp_list2 = []
    temp_list3 = []
    temp_list4 = []
    temp_list5 = []
    for scores in content:
        temp_list1.append(int(scores[6]))
        temp_list2.append(int(scores[7]))
        temp_list3.append(int(scores[8]))
        temp_list4.append(int(scores[9]))
        temp_list5.append(int(scores[10]))
    if temp_list1==[]:
        radar_value={'radarA':0,'radarB':0,'radarC':0,'radarD':0,'radarE':0}
    else:
        radar_value={'radarA':np.mean(temp_list1),'radarB':np.mean(temp_list2),'radarC':np.mean(temp_list3),'radarD':np.mean(temp_list4),'radarE':np.mean(temp_list5)}

    sql = "SELECT * FROM `question` WHERE `id` = '" + str(question_id) + "'"
    cur.execute(sql)
    content = cur.fetchall()
    radar_value_self={'radarA':content[0][19],'radarB':content[0][20],'radarC':content[0][21],'radarD':content[0][22],'radarE':content[0][23]}
    question_req_id = content[0][14]
    sql = "SELECT * FROM `question_request` WHERE `question_id_req` = '" + str(question_req_id) + "'"
    cur.execute(sql)
    content = cur.fetchall()
    
    radar_index={'radarA':content[0][6],'radarB':content[0][7],'radarC':content[0][8],'radarD':content[0][9],'radarE':content[0][10]}

    
    
    
    
    
    dict = {'radar_index':radar_index,'radar_value':radar_value,'radar_value_self':radar_value_self}
    print(dict)
    return dict
def student_getting_course(user_id):
    conn = pymysql.connect(host = '127.0.0.1',
            port = 3306,
            user = 'qsweb',
            passwd = '000000',
            db = 'question_system',
            charset='utf8')
    cur = conn.cursor()
    sql = "SELECT * FROM `course_selection_list` WHERE `student_id` = '" + str(user_id) + "'"
    cur.execute(sql)
    content = cur.fetchall()
    course_list = []
    for course in content:
        course_list.append(course[1])
    course_dict = get_dict_course()

    dict_return = {}
    for course_id in course_dict:
        if(str(course_id) in course_list):
            dict_return[course_id] = course_dict[course_id]
    return dict_return
if __name__ == "__main__":
    print(trans_course(20))