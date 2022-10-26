import pymysql
# get annual sales rank
def get_dict_users():
    conn = pymysql.connect(host = '127.0.0.1',
                       port = 3306,
                       user = 'qsweb',
                       passwd = '000000',
                       db = 'question_system',
                       charset='utf8')
    cur = conn.cursor()
    sql = "select * from users"
    cur.execute(sql)
    content = cur.fetchall()
    dict = {}
    for data in content:
        #print(data)
        dict[data[5]] = {'student_id':data[5],'password':data[1],'name':data[2],'permission':data[7],'school':data[3],'class':data[4],'email':data[6],'nickname':data[8]}
    cur.close()
    conn.close()
    return dict
def get_users_in_course(course_id):
    conn = pymysql.connect(host = '127.0.0.1',
                       port = 3306,
                       user = 'qsweb',
                       passwd = '000000',
                       db = 'question_system',
                       charset='utf8')
    cur = conn.cursor()
    sql = "select `student_id` from  `course_selection_list` WHERE `course_id` = '" + course_id + "'"
    cur.execute(sql)
    content = cur.fetchall()
    list = []
    for data in content:
        list.append(data[0])
    cur.close()
    conn.close()
    return list

def check_repeat_users(school,classs,student_id):
    dict = get_dict_users()
    for id in dict:
        #print(id)
        if id == student_id:
            #print("True")
            return True
    return False
def get_user_info(name):
    dict = get_dict_users()
    return dict[name]

def get_student_info(school,clas,student_id,status="",course_id=""):
    print(123456,school,clas,student_id,status,course_id)
    dict = get_dict_users()
    student_dict = {}
    if status=="":
        for id in dict:
            if dict[id]['permission'] == 'student':
                if (school == "" or dict[id]['school'] == school ) and (clas == "" or dict[id]['class'] == clas ) and (student_id == "" or dict[id]['student_id'] == student_id ):
                    student_dict[id] = dict[id]
    else :
        student_list = get_users_in_course(course_id)
        for id in dict:
            if dict[id]['permission'] == 'student':
                print(id)
                if (school == "" or dict[id]['school'] == school ) and (clas == "" or dict[id]['class'] == clas ) and (student_id == "" or dict[id]['student_id'] == student_id ):
                    if status=="in_course" and id in student_list:
                        student_dict[id] = dict[id]
                    elif status == "not_in_course" and id not in student_list:
                        student_dict[id] = dict[id]
    return student_dict
def user_info_updating(data):
    conn = pymysql.connect(host = '127.0.0.1',
                       port = 3306,
                       user = 'qsweb',
                       passwd = '000000',
                       db = 'question_system',
                       charset='utf8')
    cur = conn.cursor()
    into = "UPDATE `users` SET `name`=%s,`school`=%s,`class`=%s,`email`=%s,`nickname`=%s WHERE `student_id`=%s"
    #(`passwd`,`name`,`school`,`class`,`student_id`,`email`,`permission`,`nickname`) VALUES (%s,%s,%s,%s,%s,%s,%s,%s);"
    values = (data["name"],data["school"],data["class"],data["email"],data["nickname"],data["student_id"])
    cur.execute(into, values)
    conn.commit()
    cur.close()
    conn.close()
    return 'ok'
if __name__ == "__main__":
    get_users_in_course("test_0")