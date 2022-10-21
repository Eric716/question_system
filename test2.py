# -*- coding: UTF-8 -*-
keys1=input("Enter keys:")
#輸入Keys
K=[]
#建立一個List
for i in range (5):
    values1=input("Enter values:")
    K.append(values1)
keys2=input("Enter keys:")
#輸入值並加入ListK裡面並重複5次
A=[]
for i in range (5):
    values2=input("Enter values:")
    A.append(values2)
keys3=input("Enter keys:")
B=[]
for i in range (5):
    values3=input("Enter values:")
    B.append(values3)
keys4=input("Enter keys:")
C=[]
for i in range (5):
    values4=input("Enter values:")
    C.append(values4)
dict0={}
dict0[keys1]=K
dict0[keys2]=A
dict0[keys3]=B
dict0[keys4]=C
print("dict0="+str(dict0))
