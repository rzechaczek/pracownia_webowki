def zad1():
    string =""
    i=0
    with open('sygnaly.txt','r') as f:
        for l in f:
            i = i + 1
            if(i%40==0):
                string += l[9]
    print(string)
zad1()

def zad2():
    max=0
    wynik=""
    with open('sygnaly.txt','r') as f:
        for l in f:
            if(max<len(set(l)) - 1):
                max = len(set(l))-1
                wynik =l
    print(wynik +str(max))
zad2()

def zad3():

