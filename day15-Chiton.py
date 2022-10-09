from math import floor
import os
import sys

os.system("cls")

with open('day15.txt',"r") as f:
    inp1 = f.read().split("\n")
inp1 = [[int(xx) for xx in x] for x in inp1]

orows = len(inp1)
ocols = len(inp1[0])
rows = orows*5
cols = ocols*5

inp =  [[0 for column in range(cols)]
                  for row in range(rows)]

for i in range(rows):
  for j in range(cols):
    num = (inp1[i%orows][j%ocols]  + (floor(i/orows) + floor(j/ocols)))
    inp[i][j] = num if num < 10 else (num%10)+1
    

# for i in range(rows):
#   line = ""
#   for j in range(cols):
#     line += str(inp[i][j]) + " "
#   print(line)

class Graph():
 
  def __init__(self, vertices):
    self.V = vertices
    self.graph = [[] for row in range(vertices)]

    # A utility function to find the vertex with
    # minimum distance value, from the set of vertices
    # not yet included in shortest path tree
  def minDistance(self, dist, sptSet):
 
    # Initialize minimum distance for next node
    min = sys.maxsize

    # Search the nearest vertex not in the
    # shortest path tree
    for u in dist.keys(): 
      if dist[u] < min:
        min = dist[u]
        min_index = u

    return min_index
 
    # Function that implements Dijkstra's single source
    # shortest path algorithm for a graph represented
    # using adjacency matrix representation
  def dijkstra(self, src):

    # dist = [sys.maxsize] * self.V
    dist = {}
    dist1 = {}
    dist[src] = 0
    dist1[src] = 0
    sptSet = [False] * self.V

    for cout in range(self.V):

      # Pick the minimum distance vertex from
      # the set of vertices not yet processed.
      # x is always equal to src in first iteration
      x = self.minDistance(dist1, sptSet)

      # Put the minimum distance vertex in the
      # shortest path tree
      sptSet[x] = True
      del dist1[x]
      if  x == rows*cols-1:
        print(dist[x])
        break

      # Update dist value of the adjacent vertices
      # of the picked vertex only if the current
      # distance is greater than new distance and
      # the vertex in not in the shortest path tree
      neighbors = graph[x]
      
      for n in neighbors:
        y = n[0]
        val = n[1]
        if sptSet[y] == False and (dist.get(y) == None or dist[y] > dist[x] + val):
          dist1[y] = dist[y] = dist[x] + val

    # self.printSolution(dist)

def get_flat_index(row, col):
  return row*cols + col

graph = [[] for row in range(rows*cols)]

def populate_graph(src, x, y):
  up = inp[x][y]
  dest = get_flat_index(x,y)
  graph[src].append([dest, up])

def run():
  for i in range(rows):
    for j in range(cols):
      src = get_flat_index(i,j)
      if i>0:
        populate_graph(src, i-1, j)
      if j>0:
        populate_graph(src, i, j-1)
      if i<rows-1:
        populate_graph(src, i+1, j)
      if j<cols-1:
        populate_graph(src, i, j+1)

  print("generated graph", rows*cols)
  g = Graph(rows*cols)
  g.graph = graph
  g.dijkstra(0)
      
run()


