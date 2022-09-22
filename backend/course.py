import pymysql
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
        dict[data[3]] = {'course_id':data[2],'teacher':data[1]}
    #print(dict)
    return dict

def check_repeat_course(course_id):
    dict = get_dict_course()
    for id in dict:
        if dict[id]['course_id'] == course_id:
            print("True")
            return True
    return False
def trans_course(course_id):
    dict = get_dict_course()
    print(int(course_id))
    for id in dict:
        print(dict[id]['course_id'])
        if dict[id]['course_id'] == course_id:
            print("check")
            return id
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
    print(action)
    return 'ok'
def get_guidance(course_id):
    conn = pymysql.connect(host = '127.0.0.1',
            port = 3306,
            user = 'qsweb',
            passwd = '000000',
            db = 'question_system',
            charset='utf8')
    cur = conn.cursor()
    sql = "SELECT * FROM `guidance` WHERE `course_id` = '" + str(course_id) + "'"
    cur.execute(sql)
    content = cur.fetchall()
    dict = {}
    for guide in content:
        dict[guide[6]] = {'en_description':guide[0],'ch_description':guide[1],'en_example':guide[2],'ch_example':guide[3]}
    conn.commit()
    print(dict)
    return dict
def add_guidance(course_id,EN_description,CN_description,EN_example,CN_example):
    conn = pymysql.connect(host = '127.0.0.1',
                port = 3306,
                user = 'qsweb',
                passwd = '000000',
                db = 'question_system',
                charset='utf8')
    print(CN_description)
    if EN_description.strip()== "" or CN_description.strip() == "" or EN_example.strip() == "" or CN_example.strip() =="":
        return "請輸入完整資料！"
    cur = conn.cursor()
    sql =  "INSERT INTO `guidance` (`status`,`course_id`, `EN_description`, `CN_description`,`EN_example`,`CN_example`) VALUES (0, '"+course_id+"', '"+EN_description+"', '"+CN_description+"', '"+EN_example+"', '"+CN_example+"');"
    print(sql)
    cur.execute(sql)
    conn.commit()
    return 'ok'
def add_question(data):
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
    sql =  "INSERT INTO `question_request` (`course_id`, `question_id`, `question_type`, `hashtag1`, `hashtag2`, `hashtag3`, `radar1`, `radar2`, `radar3`, `radar4`, `radar5`) VALUES (%s,NULL,0,%s,%s,%s,%s,%s,%s,%s,%s);"
    values = (course_id,hashtagA,hashtagB,hashtagC,radarA,radarB,radarC,radarD,radarE)
    cur.execute(sql, values)
    conn.commit()
    return 'ok'
def list_question(data):
    course_id = data['course_id']
    conn = pymysql.connect(host = '127.0.0.1',
            port = 3306,
            user = 'qsweb',
            passwd = '000000',
            db = 'question_system',
            charset='utf8')
    cur = conn.cursor()
    sql = "SELECT * FROM `question_request` WHERE `course_id` = '" + str(course_id) + "'"
    cur.execute(sql)
    content = cur.fetchall()
    dict = {}

    for question in content:
        dict[question[1]] = {'course_name':trans_course(question[0]),'hashtagA':question[3],'hashtagB':question[4],'hashtagC':question[5],'radarA':question[6],'radarB':question[7],'radarC':question[8],'radarD':question[9],'radarE':question[10]}
    print(dict)
    return dict
if __name__ == "__main__":
    trans_course(15109)