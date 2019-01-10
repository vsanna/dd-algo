/*
## Dijikstra's Algorithm
- 最小ルートを特定するアルゴリズム
- 用途
	- 最短経路特定問題
	- 
- 実装方法は2つある
	1. PriorityQueueを用いる
	2. BinaryHeapを用いる
- アルゴリズム
	1. 始点をひとつもつ.
	2. メモとなるデータとして、最短距離map, visited, previousを用意する
		1. 始点から全点への今の所判明している最短距離をmapで保存する. 初期値はInfinity
			- let tmp_shortest_map_from_A = { 'A': Infinity, 'B': Infinity }
		2. 訪れたvertexのmap
			- let visited = { 'A': true }
		3. 各点において、その点に訪れる直前に通った点をメモするmap. その点に確実に移動したタイミングで更新する
			- let previous = { 'A': null, 'B': 'A' }
	3. (loop) 今いる点をvisitedに追加する
	3. (loop) 今いる点から1hopでいける隣接点全てに対して、判明している最短距離の更新を行う
		- 今の点までの(現在判明している)最短距離 + 隣接点までの距離の合計と、その点までの(現在判明している)最短距離を比較し、小さければ更新する
		- 更新した場合は、その隣接点のpreviousを現在の点に更新する
	4. (loop) 未訪問でかつ最も距離が短い点に移動する
		- このとき、今いる位置は関係ない. もう一度Aから最短距離でその
	5. (loop 終了条件)
	6. previousを逆順にしたものが経路、距離はその点までのtmp_shortest_map_from_Aに記録されている　
*/