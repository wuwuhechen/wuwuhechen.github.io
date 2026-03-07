---
title: 数据结构设计高频题
published: 2026-02-04
date: 2026-02-04
pinned: false
description: 数据结构设计高频题
tags: [数据结构,算法,设计]
category: 算法
licenseName: "Unlicensed"
draft: false
---

**除非特殊标记，本文代码块均使用Java语言编写**

本文基于左程云老师的[数据结构设计视频]( https://www.bilibili.com/video/BV1nF411y7rD/?share_source=copy_web&vd_source=244da970c0c9dc0aaf29a16589050a20 "数据结构设计高频题")总结

# 数据结构设计高频题
## setAll功能的哈希表
**背景**：设计一个哈希表，支持基本的put、get操作，并且支持一个setAll操作，可以将所有键的值设置为同一个值。

**需要实现的操作**：
1. `put(key, value)`：将键key的值设置为value。
2. `get(key)`：获取键key的值，如果键不存在则返回-1。
3. `setAll(value)`：将所有键的值设置为value。

**思路**：
1. 使用一个全局变量来记录setAll操作设置的值。
2. 使用一个版本号来记录每次setAll操作的时间戳。
3. 在每次put操作时，记录该键的版本号。
4. 在get操作时，比较该键的版本号和全局版本号，如果该键的版本号小于全局版本号，则返回全局值，否则返回该键的值。

**代码实现**：
```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.StreamTokenizer;
import java.util.HashMap;

public class SetAllHashMap {

	public static HashMap<Integer, int[]> map = new HashMap<>();
	public static int setAllValue;
	public static int setAllTime;
	public static int cnt;

	public static void put(int k, int v) {
		if (map.containsKey(k)) {
			int[] value = map.get(k);
			value[0] = v;
			value[1] = cnt++;
		} else {
			map.put(k, new int[] { v, cnt++ });
		}
	}

	public static void setAll(int v) {
		setAllValue = v;
		setAllTime = cnt++;
	}

	public static int get(int k) {
		if (!map.containsKey(k)) {
			return -1;
		}
		int[] value = map.get(k);
		if (value[1] > setAllTime) {
			return value[0];
		} else {
			return setAllValue;
		}
	}

	public static int n, op, a, b;

	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StreamTokenizer in = new StreamTokenizer(br);
		PrintWriter out = new PrintWriter(new OutputStreamWriter(System.out));
		while (in.nextToken() != StreamTokenizer.TT_EOF) {
			map.clear();
			setAllValue = 0;
			setAllTime = -1;
			cnt = 0;
			n = (int) in.nval;
			for (int i = 0; i < n; i++) {
				in.nextToken();
				op = (int) in.nval;
				if (op == 1) {
					in.nextToken();
					a = (int) in.nval;
					in.nextToken();
					b = (int) in.nval;
					put(a, b);
				} else if (op == 2) {
					in.nextToken();
					a = (int) in.nval;
					out.println(get(a));
				} else {
					in.nextToken();
					a = (int) in.nval;
					setAll(a);
				}
			}
		}
		out.flush();
		out.close();
		br.close();
	}`

}
```

## 实现LRU缓存
**背景**：设计并实现一个LRU（最近最少使用）缓存，支持get和put操作。

**需要实现的操作**：
1. `get(key)`：如果键存在，返回键对应的值，否则返回-1。
2. `put(key, value)`：将键key的值设置为value。如果缓存达到容量限制，则移除最近最少使用的键。

**思路**：
1. 使用一个双向链表来维护键的使用顺序，最近使用的键放在链表尾部，最久未使用的键放在链表头部。
2. 使用一个哈希表来存储键和链表节点的映射，方便快速访问。
3. 在get操作时，将访问的节点移动到链表尾部。
4. 在put操作时，如果键已存在，更新值并将节点移动到链表尾部；如果键不存在，创建新节点并添加到链表尾部，如果超过容量限制，移除链表头部节点。

**代码实现**：
```java
package class035;

import java.util.HashMap;

public class LRU {

	// 测试链接 : https://leetcode.cn/problems/lru-cache/
	class LRUCache {

		class DoubleNode {
			public int key;
			public int val;
			public DoubleNode last;
			public DoubleNode next;

			public DoubleNode(int k, int v) {
				key = k;
				val = v;
			}
		}

		class DoubleList {
			private DoubleNode head;
			private DoubleNode tail;

			public DoubleList() {
				head = null;
				tail = null;
			}

			public void addNode(DoubleNode newNode) {
				if (newNode == null) {
					return;
				}
				if (head == null) {
					head = newNode;
					tail = newNode;
				} else {
					tail.next = newNode;
					newNode.last = tail;
					tail = newNode;
				}
			}

			public void moveNodeToTail(DoubleNode node) {
				if (tail == node) {
					return;
				}
				if (head == node) {
					head = node.next;
					head.last = null;
				} else {
					node.last.next = node.next;
					node.next.last = node.last;
				}
				node.last = tail;
				node.next = null;
				tail.next = node;
				tail = node;
			}

			public DoubleNode removeHead() {
				if (head == null) {
					return null;
				}
				DoubleNode ans = head;
				if (head == tail) {
					head = null;
					tail = null;
				} else {
					head = ans.next;
					ans.next = null;
					head.last = null;
				}
				return ans;
			}

		}

		private HashMap<Integer, DoubleNode> keyNodeMap;

		private DoubleList nodeList;

		private final int capacity;

		public LRUCache(int cap) {
			keyNodeMap = new HashMap<>();
			nodeList = new DoubleList();
			capacity = cap;
		}

		public int get(int key) {
			if (keyNodeMap.containsKey(key)) {
				DoubleNode ans = keyNodeMap.get(key);
				nodeList.moveNodeToTail(ans);
				return ans.val;
			}
			return -1;
		}

		public void put(int key, int value) {
			if (keyNodeMap.containsKey(key)) {
				DoubleNode node = keyNodeMap.get(key);
				node.val = value;
				nodeList.moveNodeToTail(node);
			} else {
				if (keyNodeMap.size() == capacity) {
					keyNodeMap.remove(nodeList.removeHead().key);
				}
				DoubleNode newNode = new DoubleNode(key, value);
				keyNodeMap.put(key, newNode);
				nodeList.addNode(newNode);
			}
		}

	}

}    
```

## 插入删除和获取随机元素O(1)
**背景**：设计一个数据结构，支持在平均时间复杂度O(1)内完成插入、删除和获取随机元素的操作。

**需要实现的操作**：
1. `insert(val)`：如果元素val不存在，则插入该元素并返回true
2. `remove(val)`：如果元素val存在，则删除该元素并返回true
3. `getRandom()`：随机返回一个元素，所有元素被返回的概率相同

**思路**：
1. 使用一个动态数组（ArrayList）来存储元素，方便随机访问。
2. 使用一个哈希表来存储元素值和其在数组中的索引，方便快速查找和删除。
3. 在插入操作时，将元素添加到数组末尾，并在哈希表中记录其索引。
4. 在删除操作时，将要删除的元素与数组末尾的元素交换位置，然后删除数组末尾的元素，并更新哈希表中的索引。
5. 在获取随机元素时，直接从数组中随机选择一个元素返回。

**代码实现**：
```java
public class InsertDeleteRandom {

	// 测试链接 : https://leetcode.cn/problems/insert-delete-getrandom-o1/
	class RandomizedSet {

		public HashMap<Integer, Integer> map;

		public ArrayList<Integer> arr;

		public RandomizedSet() {
			map = new HashMap<>();
			arr = new ArrayList<>();
		}

		public boolean insert(int val) {
			if (map.containsKey(val)) {
				return false;
			}
			map.put(val, arr.size());
			arr.add(val);
			return true;
		}

		public boolean remove(int val) {
			if (!map.containsKey(val)) {
				return false;
			}
			int valIndex = map.get(val);
			int endValue = arr.get(arr.size() - 1);
			map.put(endValue, valIndex);
			arr.set(valIndex, endValue);
			map.remove(val);
			arr.remove(arr.size() - 1);
			return true;
		}

		public int getRandom() {
			return arr.get((int) (Math.random() * arr.size()));
		}

	}

}
```

### 插入删除和获取随机元素O(1) II
**背景**：设计一个数据结构，支持在平均时间复杂度O(1)内完成插入、删除和获取随机元素的操作，允许重复元素。

**需要实现的操作**：
1. `insert(val)`：插入元素val
2. `remove(val)`：删除一个元素val
3. `getRandom()`：随机返回一个元素，所有元素被返回的概率相同

**思路**：
1. 使用一个动态数组（ArrayList）来存储元素，方便随机访问。
2. 使用一个哈希表来存储元素值和其在数组中的所有索引，方便快速查找和删除。
3. 在插入操作时，将元素添加到数组末尾，并在哈希表中记录其索引。
4. 在删除操作时，将要删除的元素与数组末尾的元素交换位置，然后删除数组末尾的元素，并更新哈希表中的索引。
5. 在获取随机元素时，直接从数组中随机选择一个元素返回。

**代码实现**：
```java
public class InsertDeleteRandomDuplicatesAllowed {

	// 测试链接 :
	// https://leetcode.cn/problems/insert-delete-getrandom-o1-duplicates-allowed/
	class RandomizedCollection {

		public HashMap<Integer, HashSet<Integer>> map;

		public ArrayList<Integer> arr;

		public RandomizedCollection() {
			map = new HashMap<>();
			arr = new ArrayList<>();
		}

		public boolean insert(int val) {
			arr.add(val);
			HashSet<Integer> set = map.getOrDefault(val, new HashSet<Integer>());
			set.add(arr.size() - 1);
			map.put(val, set);
			return set.size() == 1;
		}

		public boolean remove(int val) {
			if (!map.containsKey(val)) {
				return false;
			}
			HashSet<Integer> valSet = map.get(val);
			int valAnyIndex = valSet.iterator().next();
			int endValue = arr.get(arr.size() - 1);
			if (val == endValue) {
				valSet.remove(arr.size() - 1);
			} else {
				HashSet<Integer> endValueSet = map.get(endValue);
				endValueSet.add(valAnyIndex);
				arr.set(valAnyIndex, endValue);
				endValueSet.remove(arr.size() - 1);
				valSet.remove(valAnyIndex);
			}
			arr.remove(arr.size() - 1);
			if (valSet.isEmpty()) {
				map.remove(val);
			}
			return true;
		}

		public int getRandom() {
			return arr.get((int) (Math.random() * arr.size()));
		}
	}

}
```

### 数据流的中位数
**背景**：设计一个数据结构，支持在数据流中动态添加数字，并能在O(log n)时间内获取当前数据流的中位数。

**需要实现的操作**：
1. `addNum(num)`：向数据流中添加一个数字num。
2. `findMedian()`：返回当前数据流的中位数。

**思路**：
1. 使用两个堆来维护数据流中的数字：一个最大堆（leftHeap）用于存储较小的一半数字，另一个最小堆（rightHeap）用于存储较大的一半数字。
2. 保持两个堆的大小平衡，确保leftHeap的大小等于rightHeap的大小或比rightHeap大1。
3. 在添加数字时，根据数字的大小将其放入合适的堆中，并调整堆的大小以保持平衡。
4. 在获取中位数时，如果两个堆大小相等，中位数为两个堆顶元素的平均值；如果leftHeap比rightHeap大1，中位数为leftHeap的堆顶元素。

**代码实现**：
```java
public class MedianFinder {

	// 测试链接 : https://leetcode.cn/problems/find-median-from-data-stream/
	class MedianFinder {

		private PriorityQueue<Integer> maxHeap;

		private PriorityQueue<Integer> minHeap;

		public MedianFinder() {
			maxHeap = new PriorityQueue<>((a, b) -> b - a);
			minHeap = new PriorityQueue<>((a, b) -> a - b);
		}

		public void addNum(int num) {
			if (maxHeap.isEmpty() || maxHeap.peek() >= num) {
				maxHeap.add(num);
			} else {
				minHeap.add(num);
			}
			balance();
		}

		public double findMedian() {
			if (maxHeap.size() == minHeap.size()) {
				return (double) (maxHeap.peek() + minHeap.peek()) / 2;
			} else {
				return maxHeap.size() > minHeap.size() ? maxHeap.peek() : minHeap.peek();
			}
		}

		private void balance() {
			if (Math.abs(maxHeap.size() - minHeap.size()) == 2) {
				if (maxHeap.size() > minHeap.size()) {
					minHeap.add(maxHeap.poll());
				} else {
					maxHeap.add(minHeap.poll());
				}
			}
		}

	}

}
```

### 最大频率栈
**背景**：设计一个栈，支持在O(1)时间内完成push、pop和获取最大频率元素的操作。

**需要实现的操作**：
1. `push(val)`：将元素val推入栈中。
2. `pop()`：移除并返回栈中出现频率最高的元素。如果有多个元素频率相同，返回最近添加的那个元素。

**思路**：
1. 使用一个哈希表来记录每个元素的频率。
2. 使用另一个哈希表来记录每个频率对应的元素栈，方便快速获取最大频率元素。
3. 使用一个变量来记录当前的最大频率。
4. 在push操作时，更新元素的频率，并将其添加到对应频率的栈中，更新最大频率。
5. 在pop操作时，从最大频率的栈中弹出元素，更新元素的频率，如果该频率的栈为空，减少最大频率。

**代码实现**：
```java
public class MaximumFrequencyStack {

	// 测试链接 : https://leetcode.cn/problems/maximum-frequency-stack/
	class FreqStack {

		// 出现的最大次数
		private int topTimes;
		// 每层节点
		private HashMap<Integer, ArrayList<Integer>> cntValues = new HashMap<>();
		// 每一个数出现了几次
		private HashMap<Integer, Integer> valueTimes = new HashMap<>();

		public void push(int val) {
			valueTimes.put(val, valueTimes.getOrDefault(val, 0) + 1);
			int curTopTimes = valueTimes.get(val);
			if (!cntValues.containsKey(curTopTimes)) {
				cntValues.put(curTopTimes, new ArrayList<>());
			}
			ArrayList<Integer> curTimeValues = cntValues.get(curTopTimes);
			curTimeValues.add(val);
			topTimes = Math.max(topTimes, curTopTimes);
		}

		public int pop() {
			ArrayList<Integer> topTimeValues = cntValues.get(topTimes);
			int ans = topTimeValues.remove(topTimeValues.size() - 1);
			if (topTimeValues.size() == 0) {
				cntValues.remove(topTimes--);
			}
			int times = valueTimes.get(ans);
			if (times == 1) {
				valueTimes.remove(ans);
			} else {
				valueTimes.put(ans, times - 1);
			}
			return ans;
		}
	}

}
```

### 全为O(1)的数据结构
**背景**：设计一个数据结构，用于字符串计数，并能够返回计数最小和最大的字符串，所有操作均在O(1)时间内完成。

**需要实现的操作**：
1. `inc(key)`：将字符串key的计数增加1。
2. `dec(key)`：将字符串key的计数减少1，如果计数为0则删除该字符串。
3. `getMaxKey()`：返回计数最大的字符串。
4. `getMinKey()`：返回计数最小的字符串。

**思路**：
1. 使用一个双向链表来维护计数的顺序，每个节点表示一个计数值，节点中存储具有该计数值的字符串集合。
2. 使用一个哈希表来存储字符串和其对应的节点，方便快速访问和更新。
3. 在inc操作时，更新字符串的计数，并将其移动到下一个节点，如果下一个节点不存在则创建一个新节点。
4. 在dec操作时，更新字符串的计数，并将其移动到上一个节点，如果计数为0则删除该字符串。
5. 在getMaxKey和getMinKey操作时，直接返回链表头部或尾部节点中的任意字符串。

**代码实现**：
```java
public class AllO1 {

	// 测试链接 : https://leetcode.cn/problems/all-oone-data-structure/
	class AllOne {

		class Bucket {
			public HashSet<String> set;
			public int cnt;
			public Bucket last;
			public Bucket next;

			public Bucket(String s, int c) {
				set = new HashSet<>();
				set.add(s);
				cnt = c;
			}
		}

		private void insert(Bucket cur, Bucket pos) {
			cur.next.last = pos;
			pos.next = cur.next;
			cur.next = pos;
			pos.last = cur;
		}

		private void remove(Bucket cur) {
			cur.last.next = cur.next;
			cur.next.last = cur.last;
		}

		Bucket head;

		Bucket tail;

		HashMap<String, Bucket> map;

		public AllOne() {
			head = new Bucket("", 0);
			tail = new Bucket("", Integer.MAX_VALUE);
			head.next = tail;
			tail.last = head;
			map = new HashMap<>();
		}

		public void inc(String key) {
			if (!map.containsKey(key)) {
				if (head.next.cnt == 1) {
					map.put(key, head.next);
					head.next.set.add(key);
				} else {
					Bucket newBucket = new Bucket(key, 1);
					map.put(key, newBucket);
					insert(head, newBucket);
				}
			} else {
				Bucket bucket = map.get(key);
				if (bucket.next.cnt == bucket.cnt + 1) {
					map.put(key, bucket.next);
					bucket.next.set.add(key);
				} else {
					Bucket newBucket = new Bucket(key, bucket.cnt + 1);
					map.put(key, newBucket);
					insert(bucket, newBucket);
				}
				bucket.set.remove(key);
				if (bucket.set.isEmpty()) {
					remove(bucket);
				}
			}
		}

		public void dec(String key) {
			Bucket bucket = map.get(key);
			if (bucket.cnt == 1) {
				map.remove(key);
			} else {
				if (bucket.last.cnt == bucket.cnt - 1) {
					map.put(key, bucket.last);
					bucket.last.set.add(key);
				} else {
					Bucket newBucket = new Bucket(key, bucket.cnt - 1);
					map.put(key, newBucket);
					insert(bucket.last, newBucket);
				}
			}
			bucket.set.remove(key);
			if (bucket.set.isEmpty()) {
				remove(bucket);
			}
		}

		public String getMaxKey() {
			return tail.last.set.iterator().next();
		}

		public String getMinKey() {
			return head.next.set.iterator().next();
		}

	}

}
```