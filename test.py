a = []
b = []
c = []
student_list = [a, b, c]
print('開始輸入A學生的成績，請依照 國文、英文、數學、自然、社會 的順序輸入:')
for i in range(5):
    flag =0
    while(flag == 0):
        A = input()
        if int(A)>100 or int(A)<0:
            print('請輸入1~100的數值!')
            flag = 0
            break
        else:
            flag = 1
            continue
    # b.append(a)
    a.append(A)
print('A學生成績:')
print('國文: '+a[0]+'、英文: '+a[1]+'、數學: '+a[2]+'、自然: '+a[3]+'、社會: '+a[4]+'\n')

print('開始輸入B學生的成績，請依照 國文、英文、數學、自然、社會 的順序輸入:')
for i in range(5):
    b.append(input())
print('B學生成績:')
print('國文: '+b[0]+'、英文: '+b[1]+'、數學: '+b[2]+'、自然: '+b[3]+'、社會: '+b[4]+'\n')

print('開始輸入C學生的成績，請依照 國文、英文、數學、自然、社會 的順序輸入:')
for i in range(5):
    c.append(input())
print('C學生成績:')
print('國文: '+c[0]+'、英文: '+c[1]+'、數學: '+c[2]+'、自然: '+c[3]+'、社會: '+c[4]+'\n')

sum = 0
for i in a:
    sum = (int(i) + sum)
    # print(int(i))
    avg = sum / 5
print('A學生平均成績 : ', avg)
sum = 0
for i in b:
    sum = (int(i) + sum)
    # print(int(i))
    avg = sum / 5
print('B學生平均成績 : ', avg)
sum = 0
for i in c:
    sum = (int(i) + sum)
    # print(int(i))
    avg = sum / 5
print('C學生平均成績 : ', avg)
print()

sum = 3
avg_list = []
for i in range(5):
    sum = int(a[i])+int(b[i])+int(c[i])
    avg = sum / 3
    avg_list.append(avg)
    # print('國文平均成績 : '+avg)
print('國文平均成績 : '+ str(avg_list[0]))
print('英文平均成績 : '+ str(avg_list[1]))
print('數學平均成績 : '+ str(avg_list[2]))
print('自然平均成績 : '+ str(avg_list[3]))
print('社會平均成績 : '+ str(avg_list[4]))