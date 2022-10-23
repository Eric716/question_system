
from flask import Flask, request, render_template, url_for, redirect, flash,session
from flask_restful import Resource, Api
from datetime import timedelta
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
import requests, json, glob, time
#import pandas as pd
import numpy as np
from backend.user import *
from backend.course import *
from backend.question import *
import pymysql
conn = pymysql.connect(host = '127.0.0.1',
                       port = 3306,
                       user = 'qsweb',
                       passwd = '000000',
                       db = 'question_system',
                       charset='utf8')

# Create Flask app object
app = Flask(__name__, static_folder="./question_system/",template_folder='./question_system/')
 
############################
#   USER 管理 控制
############################
app.secret_key = '1123456987687345'
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.refresh_view = 'relogin'
login_manager.login_view = '/question_system/login'
login_manager.login_message = '請先登入'
login_manager.needs_refresh_message = (u"Session timedout, please re-login")
login_manager.needs_refresh_message_category = "info"
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(hours=6)

class User(UserMixin):
    pass

@login_manager.user_loader
def user_loader(使用者):
    users = get_dict_users()
    if 使用者 not in users:
        return

    user = User()
    user.id = 使用者
    return user

@login_manager.request_loader
def request_loader(request):
    users = get_dict_users()
    使用者 = request.form.get('user_id')
    if 使用者 not in users:
        return

    user = User()
    user.id = 使用者

    # DO NOT ever store passwords in plaintext and always compare password
    # hashes using constant-time comparison!
    user.is_authenticated = request.form['password'] == users[使用者]['password']

    return user

@app.route('/whoami')
def whoami():
    return current_user.id
############################
#   登入與註冊
############################
@app.route("/question_system/login")
def gotologin():
    return render_template("login.html")
@app.route('/login', methods=['GET', 'POST'])
def login():
    users = get_dict_users()
    if request.method == 'GET':
        return render_template("login.html")
    form = request.form.to_dict()
    使用者 = form['student_id']
    if (使用者 in users) and (form['passwd'] == users[使用者]['password']):
        user = User()
        user.id = 使用者

        login_user(user)
        if users[使用者]['permission']=='teacher':
            return 'teacher_login'
        elif users[使用者]['permission']=='student':
            return "student_login"
        elif users[使用者]['permission']=='reporter':
            return "reporter_login"
    print("login_fail")
    return "login_fail"
    # return render_template('login.html')
@app.route('/logout')
def logout():
    使用者 = current_user.get_id()
    logout_user()
    flash(f'{使用者}！歡迎下次再來！')
    return "logout"


@app.route('/register',methods=['POST'])
def register():
    data = request.form.to_dict()
    cur = conn.cursor()

    for key in data:
        if data[key].strip()=="":
            return "請輸入完整資料！"
    if data['passwd'] != data['repeatpasswd']:
        return "密碼不相同！"
    if check_repeat_users(data["school"],data["class"],data["student_id"]):
        return "此身分已註冊"
    if 'teacher' in data['student_id']:
        data['permission'] = 'teacher'
    else:
        data['permission'] = 'student'

    into = "INSERT INTO `users`(`passwd`,`name`,`school`,`class`,`student_id`,`email`,`permission`,`nickname`) VALUES (%s,%s,%s,%s,%s,%s,%s,%s);"
    values = (data["passwd"],data["name"],data["school"],data["class"],data["student_id"],data["email"],data["permission"],data["nickname"])
    cur.execute(into, values)
    conn.commit()
    return '註冊成功'
@app.route('/user_info_update',methods=['POST'])
def user_info_update():
    data = request.form.to_dict()
    return user_info_updating(data)
############################
#   課程管理
############################
@app.route('/new_course', methods=['POST'])
def new_course():
    if not current_user.is_authenticated:
        return 'not_login'
    data = request.form.to_dict()
    cur = conn.cursor()
    course_name = data['course_name']
    for key in data:
        if data[key].strip()=="":
            return "請輸入完整資料！"

    print("login_fail")
    into = "INSERT INTO `courses` (`id`, `user_id`,  `course_name`) VALUES (NULL, %s,%s);"
    values = (current_user.id,course_name)
    cur.execute(into, values)
    conn.commit()
    return '新增成功'
@app.route("/get_course")
def getcourse():
    if not current_user.is_authenticated:
        return 'not_login'
    return get_dict_course(current_user.id)

@app.route("/trans_course/<id>")
def transcourse(id):
    if not current_user.is_authenticated:
        return 'not_login'
    return trans_course(id)

@app.route("/course_selection/<action>", methods=['POST'])
def course_select(action):
    if not current_user.is_authenticated:
        return 'not_login'
    data = request.form.to_dict()
    print('data',data)
    course_id = data['course_id']
    student_id = data['student_id']
    school = data['school']
    clas = data['class']
    student_id_con = data['student_id_con']
    status = data['status']
    course_selection(action,course_id,student_id)
    student_info = get_student_info(school,clas,student_id_con,status,course_id)
    print('student_info',student_info)
    return student_info


@app.route("/adding_question", methods=['POST'])
def adding_question():
    if not current_user.is_authenticated:
        return 'not_login'
    data = request.form.to_dict()
    print('data',data)
    return add_question(data)

@app.route("/listing_question", methods=['POST'])
def listing_question():
    if not current_user.is_authenticated:
        return 'not_login'
    data = request.form.to_dict()
    print('data',data)
    return list_question(data)

@app.route("/listing_question_response" , methods=['POST'])
def list_response():
    if not current_user.is_authenticated:
        return 'not_login'
    data = request.form.to_dict()
    print('data',data)
    return listing_question_response(data,current_user.id)

@app.route("/get_scores_comments",methods=['POST'])
def get_scores_comments():
    if not current_user.is_authenticated:
        return 'not_login'
    data = request.form.to_dict()
    print('data',data)
    return getting_scores_comments(data)

@app.route("/get_scores_mean",methods=['POST'])
def get_scores_mean():
    if not current_user.is_authenticated:
        return 'not_login'
    data = request.form.to_dict()
    print('data',data)
    return getting_scores_mean(data)

@app.route("/student_get_course",methods = ['POST'])
def student_get_course():
    if not current_user.is_authenticated:
        return 'not_login'
    return student_getting_course(current_user.id)
############################
#   使用者資訊
############################
@app.route("/user_info")
def user_info():
    if not current_user.is_authenticated:
        return 'not_login'
    return get_user_info(current_user.id)

@app.route("/student_info/<name>", methods=['POST'])
def student_info(name):
    if not current_user.is_authenticated:
        return 'not_login'
    if name=="all":
        student_info = get_student_info("","","")
        print(student_info)
    elif name=="condition":
        data = request.form.to_dict()
        print(data)
        school = data['school']
        clas = data['class']
        student_id = data['student_id']

        student_info = get_student_info(school,clas,student_id)
        print(school,clas,student_id)
    else :
        data = request.form.to_dict()
        print('data',data)
        course_id = data['course_id']
        school = data['school']
        clas = data['class']
        student_id = data['student_id']
        status = data['status']

        student_info = get_student_info(school,clas,student_id,status,course_id)
        print('student_info',student_info)
    
    return student_info

@app.route("/guidance/<name>", methods=['POST'])
def guidance(name):
    if not current_user.is_authenticated:
        return 'not_login'
    if name == "get":
        data = request.form.to_dict()
        print('data',data)
        course_id = data['course_id']
        return get_guidance(course_id)
    elif name == 'add':
        data = request.form.to_dict()
        print('data',data)
        EN_description = data['EN_description']
        CN_description = data['CN_description']
        EN_example = data['EN_example']
        CN_example = data['CN_example']
        course_id = data['course_id']
        return add_guidance(course_id,EN_description,CN_description,EN_example,CN_example)


@login_required
def user_info():
    if not current_user.is_authenticated:
        return 'not_login'
    return get_user_info(current_user.id)

@app.route('/question_system/index_teacher.html')
@login_required
def index_teacher():
    return  render_template('index_teacher.html') 

@app.route('/question_system/index_reporter.html')
@login_required
def index_reporter():
    return  render_template('index_reporter.html') 

@app.route('/question_system/index.html')
@login_required
def index_student():
    
    guidance_dict = get_guidance()
    # print(guidance_dict[1]['EN_description'])
    # return render_template('question.html', guidance_dict = guidance_dict)
    return  render_template('./index.html', guidance_dict = guidance_dict) 

# @app.route('/changeselectfield/', methods=['GET', 'POST'])
# def changeselectfield():
#     if request.method == "POST":
#         data = request.get_json()
#         name = data['name']
#         song = singer2song[name]
#         return jsonify(song)
#     else:
#         return {}

@app.route('/question_system/question.html')
def question():
    guidance_dict = get_guidance()
    # print(guidance_dict[1]['EN_description'])
    return render_template('question.html', guidance_dict = guidance_dict)

@app.route('/question_system/student_question.html')
def question_html():
    guidance_dict = get_guidance(request.args.get('course_id'))
    return render_template('student_question.html', guidance_dict = guidance_dict)

@app.route('/question_system/score.html')
def score():
    return render_template('score.html')
    
@app.route("/guidance_list",methods=['POST'])

def guidance_list():
    if not current_user.is_authenticated:
        return 'not_login'
    data = request.form.to_dict()
    print(data)
    return get_guidance(data['course_id'])

@app.route("/questions_list",methods=['POST'])

def questions_list():
    if not current_user.is_authenticated:
        return 'not_login'
    data = request.form.to_dict()
    # print(data)
    # return get_questions(current_user.id)
    return get_questions(data)

@app.route("/questions_list_student",methods=['POST'])
# @login_required
def questions_list_student():
    if not current_user.is_authenticated:
        return 'not_login'
    data = request.form.to_dict()
    return get_questions_student(current_user.id)
    # return get_questions()
@app.route("/delete_question",methods=['POST'])
# @login_required
def delete_question():
    if not current_user.is_authenticated:
        return 'not_login'
    data = request.form.to_dict()
    return deleting_question(data)



@app.route("/questions_hashtag_all",methods=['POST'])
# @login_required
def questions_list2():
    if not current_user.is_authenticated:
        return 'not_login'
    # print(request.args.get('name'))
    data = request.form.to_dict()
    # print(data)
    return get_hashtag_list_all(data)

@app.route("/questions_hashtag_all2",methods=['POST'])
def questions_list3():
    if not current_user.is_authenticated:
        return 'not_login'
    # print(request.args.get('name'))
    data = request.form.to_dict()
    # print(data)
    return get_hashtag_list_all2(data)

@app.route("/test",methods=['POST'])
def test2():
    if not current_user.is_authenticated:
        return 'not_login'
    # print(request.args.get('name'))
    data = request.form.to_dict()
    # print(data)
    return test(data)

@app.route('/tables.html')
def hello_world():
    if not current_user.is_authenticated:
        return 'not_login'
    cur = conn.cursor()

    # get annual sales rank
    sql = "select * from users"
    cur.execute(sql)
    content = cur.fetchall()

	# 獲取表頭
    sql = "SHOW FIELDS FROM users"
    cur.execute(sql)
    labels = cur.fetchall()
    labels = [l[0] for l in labels]

    return render_template('tables.html', labels=labels, content=content)

@app.route("/question_system/question_create", methods=['POST'])
def question_create():
    if not current_user.is_authenticated:
        return 'not_login'
    if request.method == 'POST':
        # 偷看一下 request.form 
        data = request.form.to_dict()
        # print(data)
        python_records = web_select_specific(data, current_user.id)
        # return str(list(request.form.values())[10])
        # print(request.files['image'])
        # guidance_dict = get_guidance()
        # print(guidance_dict[1]['EN_description'])
        # return render_template('question.html', guidance_dict = guidance_dict)
        guidance_dict = get_guidance(request.args.get('course_id'))
        return render_template('student_question.html', guidance_dict = guidance_dict)
        # return  render_template('index.html', guidance_dict = guidance_dict) 
        # return str(0)
        # return render_template("show_records.html", html_records=python_records)
    else:
        return render_template("select_recordshtml")

@app.route("/question_system/return_backto_index", methods=['GET', 'POST'])
def return_backto_index():
    if not current_user.is_authenticated:
        return 'not_login'
    guidance_dict = get_guidance()
    return  render_template('index.html', guidance_dict = guidance_dict) 

@app.route("/question_system/score_input", methods=['GET', 'POST'])
def score_input():
    if not current_user.is_authenticated:
        return 'not_login'
    if request.method == 'POST':
        # 偷看一下 request.form 
        # print(request.form)
        score_to_db(request.form, current_user.id)
        # return str(list(request.form.values())[10])
        # print(request.files['image'])
        return render_template('score.html')
        # return render_template("show_records.html", html_records=python_records)
    else:
        return render_template("select_records.html")

@app.route('/wordcloud.html')
def wordcloud():
    # import nltk
    from wordcloud import WordCloud, STOPWORDS
    import numpy as np
    import matplotlib.pyplot as plt
    from PIL import Image

    # Read the whole text.
    txtfile = "cnn.txt"  # 剛才下載存的文字檔
    pngfile = "cloud.png"  # 剛才下載存的底圖
    text = open(txtfile,"r",encoding="utf-8").read()
    # alice_mask = np.array(Image.open(pngfile))

    # Generate a word cloud image
    wordcloud = WordCloud(background_color="white", contour_width=10, contour_color='steelblue').generate(text)

    # 繪圖
    plt.figure()
    # plt.imshow(wordcloud, interpolation="bilinear")
    plt.axis("off")
    wordcloud.to_file('wordcloud.png')
    # plt.show()
    return plt.show()

    # return plt.show()
# api.add_resource(Welcome, '/')
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3001, debug=True)