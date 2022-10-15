import os

os.system("cls")

inp = "220D700071F39F9C6BC92D4A6713C737B3E98783004AC0169B4B99F93CFC31AC4D8A4BB89E9D654D216B80131DC0050B20043E27C1F83240086C468A311CC0188DB0BA12B00719221D3F7AF776DC5DE635094A7D2370082795A52911791ECB7EDA9CFD634BDED14030047C01498EE203931BF7256189A593005E116802D34673999A3A805126EB2B5BEEBB823CB561E9F2165492CE00E6918C011926CA005465B0BB2D85D700B675DA72DD7E9DBE377D62B27698F0D4BAD100735276B4B93C0FF002FF359F3BCFF0DC802ACC002CE3546B92FCB7590C380210523E180233FD21D0040001098ED076108002110960D45F988EB14D9D9802F232A32E802F2FDBEBA7D3B3B7FB06320132B0037700043224C5D8F2000844558C704A6FEAA800D2CFE27B921CA872003A90C6214D62DA8AA9009CF600B8803B10E144741006A1C47F85D29DCF7C9C40132680213037284B3D488640A1008A314BC3D86D9AB6492637D331003E79300012F9BDE8560F1009B32B09EC7FC0151006A0EC6082A0008744287511CC0269810987789132AC600BD802C00087C1D88D05C001088BF1BE284D298005FB1366B353798689D8A84D5194C017D005647181A931895D588E7736C6A5008200F0B802909F97B35897CFCBD9AC4A26DD880259A0037E49861F4E4349A6005CFAD180333E95281338A930EA400824981CC8A2804523AA6F5B3691CF5425B05B3D9AF8DD400F9EDA1100789800D2CBD30E32F4C3ACF52F9FF64326009D802733197392438BF22C52D5AD2D8524034E800C8B202F604008602A6CC00940256C008A9601FF8400D100240062F50038400970034003CE600C70C00F600760C00B98C563FB37CE4BD1BFA769839802F400F8C9CA79429B96E0A93FAE4A5F32201428401A8F508A1B0002131723B43400043618C2089E40143CBA748B3CE01C893C8904F4E1B2D300527AB63DA0091253929E42A53929E420"

hextobin = {"0" : "0000",
"1" : "0001",
"2" : "0010",
"3" : "0011",
"4" : "0100",
"5" : "0101",
"6" : "0110",
"7" : "0111",
"8" : "1000",
"9" : "1001",
"A" : "1010",
"B" : "1011",
"C" : "1100",
"D" : "1101",
"E" : "1110",
"F" : "1111"}

s = ""
for i in inp:
  s += hextobin[i]


versions = 0
stack = []

def add(count):
  sum = 0
  for _ in range(count):
    sum += stack.pop()
  stack.append(sum)

def mul(count):
  mul = 1
  for _ in range(count):
    mul *= stack.pop()
  stack.append(mul)

def mini(count):
  temp = []
  for _ in range(count):
    t = stack.pop()
    temp.append(t)
  stack.append(min(temp))

def maxi(count):
  temp = []
  for _ in range(count):
    t = stack.pop()
    temp.append(t)
  stack.append(max(temp))

def greater(count):
  second = stack.pop()
  first = stack.pop()
  gt = 1 if first > second else 0
  stack.append(gt)

def lesser(count):
  second = stack.pop()
  first = stack.pop()
  gt = 1 if first < second else 0
  stack.append(gt)

def equal(count):
  second = stack.pop()
  first = stack.pop()
  gt = 1 if first == second else 0
  stack.append(gt)

def operate(typeid, count):
  if typeid == 0:
    add(count)
  elif typeid == 1:
    mul(count)
  elif typeid == 2:
    mini(count)
  elif typeid == 3:
    maxi(count)
  elif typeid == 5:
    greater(count)
  elif typeid == 6:
    lesser(count)
  elif typeid == 7:
    equal(count)

def parse_packet(s):
  # print("s", s)
  version = int(s[0:3], 2)
  typeid = int(s[3:6], 2)
  global versions
  versions += version
  s = s[6:]
  

  if typeid == 4:
    #literal
    digits = ""
    while(s[0]=="1"):
      digits += s[1:5]
      s = s[5:]
    digits += s[1:5]
    print("digits",int(digits, 2))
    stack.append(int(digits, 2))
    s = s[5:]
    return s[:]
  else:
    lenid = s[0]
    s = s[1:]
    if lenid == "0":
      l = int(s[0:15], 2)
      print("len", l)
      s = s[15:]
      curlen = len(s)
      n = 0
      print("num")
      while True:
        s = parse_packet(s)
        n += 1
        if curlen - len(s) >= l:
          break
      print("num", n)
      operate(typeid, n)
      return s[:]
    else:
      n = int(s[0:11], 2)
      print("num", n)
      s = s[11:]
      for _ in range(n):
        s = parse_packet(s)
      operate(typeid, n)
      return s[:]

parse_packet(s)

print(versions)
print(stack)
