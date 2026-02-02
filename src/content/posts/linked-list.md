---
title: 链表高频题目和必备技巧
published: 2026-02-01
date: 2026-02-02
pinned: false
description: 链表高频题目和必备技巧
tags: [数据结构，算法, 链表]
category: 算法
licenseName: "Unlicensed"
draft: true
---

# 链表高频题目和必备技巧
## 链表类题目注意点
1. 如果空间要求不严格，可以直接时使用容器
2. 要求严格，或者强调空间的优化，需要使用额外空间复杂度为O(1)的解法，一般需要使用快慢指针，或者原地修改链表结构
3. 最常用的技巧-快慢指针
4. 链表类题目的核心是coding能力
5. 链表类题目需要多写多练

## 常见链表题目
### 返回两个链表的相交点
**背景**：给定两个无环单链表，找出它们的第一个公共节点。

**思路**：
1. 计算两个链表的长度。
2. 让较长的链表先走差值步，然后两个链表同时走，直到找到相交节点。
3. 如果没有相交节点，返回null。

优化：在计算长度时可以直接判断是否相交，若不相交则直接返回null

**代码实现**
```java
public class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

public static ListNode  getIntersectionNode(ListNode h1, ListNode h2){
    if(h1 == null || h2 == null){
        return null;
    }

    ListNode a = h1, b = h2;
    int diff = 0;
    while(a != null){
        diff++;
        a = a.next;
    }
    while(b != null){
        diff--;
        b = b.next;
    }
    if(a != b){
        return null;
    }
    if(diff > 0){
        a = h1;
        b = h2;
    } else {
        a = h2;
        b = h1;
        diff = -diff;
    }
    while(diff != 0){
        diff--;
        a = a.next;
    }
    while(a != b){
        a = a.next;
        b = b.next;
    }
    return a;
}
```
### 每k个节点反转链表
**背景**：给定一个链表，每k个节点一组进行反转，如果最后剩余节点不足k个，则保持原样。 

**思路**：
1. 使用递归或者迭代的方法，每次处理k个节点。
2. 反转k个节点后，连接到前面的部分，并递归处理
3. 如果剩余节点不足k个，直接返回原链表。

**代码实现**
```java
public static ListNode reverseKGroup(ListNode head, int k) {
    ListNode a = head, b = head;
    for (int i = 0; i < k; i++) {
        if (b == null) {
            return head; // 不足k个节点，返回原链表
        }
        b = b.next;
    }
    ListNode newHead = reverse(a, b);
    a.next = reverseKGroup(b, k);
    return newHead;
}

public static ListNode reverse(ListNode a, ListNode b) {
    ListNode prev = null, curr = a, next = null;
    while (curr != b) {
        next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}
```

### 复制带随机指针的链表
**背景**：给定一个链表，每个节点除了有一个next指针指向下一个节点外，还有一个random指针指向链表中的任意节点或null。要求复制这个链表。