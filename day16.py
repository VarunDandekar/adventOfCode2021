import os

os.system("cls")

with open('day16.txt',"r") as f:
    inp = f.read()  
inp = "{0:08b}".format(int(inp, 16))
print(inp)
print(len(inp))

def parse_packet(s):
  version = int(s[0:3], 2)
  typeid = int(s[3:6], 2)
  print(version, typeid)
  if typeid != 4:
    # operator
    lenid = int(s[6], 2)
    print(lenid)
    if lenid == 0:
      # total len
      length = int(s[7:22],2)
      print(length)
    elif lenid == 1:
      num = int(s[7:18],2)
      print(num)
      # total packets


parse_packet(inp)
