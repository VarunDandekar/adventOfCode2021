import os
from collections import Counter

os.system("cls")

with open('day14.txt',"r") as f:
    inp = f.read().split("\n")

str = inp[0]

rules = {}
for line in inp:
  if line.count("->") > 0:
    [key, val] = line.split(" -> ")
    rules[key] =  val

pair_occurance_map = {}

def add_to_occurance_map(m, pair, occ):
  if not m.get(pair):
    m[pair] = occ
  else:
    m[pair] = m[pair]+occ

def parse_template():
  new_pair_occurance_map = {}
  for [pair, occ] in pair_occurance_map.items():
    if rules.get(pair):
      add_to_occurance_map(new_pair_occurance_map, pair[0]+rules[pair], occ)
      add_to_occurance_map(new_pair_occurance_map, rules[pair]+pair[1], occ)
    else:
      add_to_occurance_map(new_pair_occurance_map, pair, occ)
  return new_pair_occurance_map


for i in range(len(str)-1):
  add_to_occurance_map(pair_occurance_map, str[i:i+2], 1)

# print(pair_occurance_map)

steps = 40
for _ in range(steps):
  pair_occurance_map = parse_template()

# print(pair_occurance_map)

ocurrance_map  = {}
for [pair, occ] in pair_occurance_map.items():
  add_to_occurance_map(ocurrance_map, pair[0], occ)
  add_to_occurance_map(ocurrance_map, pair[1], occ)

add_to_occurance_map(ocurrance_map, str[0], 1)
add_to_occurance_map(ocurrance_map, str[-1], 1)

occ = sorted([oc/2 for oc in ocurrance_map.values()])

print(occ[-1] - occ[0])




