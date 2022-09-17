ex = {'국어 :':100, '영어 :':80, '수학 :':75}
all = sum(ex.values())
average = all/(len(ex)*100)*100
for key, value in ex.items():
    print(key, value)
print('총점 : {0}\n평균 : {1:.2f}'.format(all, average))