---
title: 链表高频题目和必备技巧
published: 2026-02-04
date: 2026-02-02
pinned: false
description: 链表高频题目和必备技巧
tags: [数据结构,算法, 链表]
category: 算法
licenseName: "Unlicensed"
draft: false
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
[测试链接]（https://leetcode.cn/problems/intersection-of-two-linked-lists/）
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
[测试链接](https://leetcode.cn/problems/reverse-nodes-in-k-group/)
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

**思路**：
1. 遍历原链表，在每个节点后面插入一个新节点，值与原节点相同。
2. 再次遍历链表，设置新节点的random指针。
3. 最后拆分链表，得到复制后的链表。

**代码实现**
[测试链接](https://leetcode.cn/problems/copy-list-with-random-pointer/)
```java
public static Node copyRandomList(Node head) {
    if (head == null) {
        return null;
    }

    // 第一步：在每个节点后面插入一个新节点
    Node curr = head;
    while (curr != null) {
        Node newNode = new Node(curr.val);
        newNode.next = curr.next;
        curr.next = newNode;
        curr = newNode.next;
    }

    // 第二步：设置新节点的random指针
    curr = head;
    while (curr != null) {
        if (curr.random != null) {
            curr.next.random = curr.random.next;
        }
        curr = curr.next.next;
    }

    // 第三步：拆分链表
    curr = head;
    Node newHead = head.next;
    Node copyCurr = newHead;
    while (curr != null) {
        curr.next = curr.next.next;
        if (copyCurr.next != null) {
            copyCurr.next = copyCurr.next.next;
        }
        curr = curr.next;
        copyCurr = copyCurr.next;
    }

    return newHead;
}
```

### 判断链表是否回文
**背景**：给定一个链表，判断其是否为回文链表。

**思路**：
1. 使用快慢指针找到链表的中点。
2. 反转后半部分链表。
3. 比较前半部分和反转后的后半部分。

**代码实现**
[测试链接](https://leetcode.cn/problems/palindrome-linked-list/)
```java
public static boolean isPalindrome(ListNode head) {
    if (head == null || head.next == null) {
        return true;
    }

    // 使用快慢指针找到中点
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // 反转后半部分链表
    ListNode prev = null, curr = slow, next = null;
    while (curr != null) {
        next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }

    // 比较前半部分和反转后的后半部分
    ListNode left = head, right = prev;
    while (right != null) {
        if (left.val != right.val) {
            return false;
        }
        left = left.next;
        right = right.next;
    }

    return true;
}
```

### 返回链表的入环节点
**背景**：给定一个链表，判断链表是否有环，如果有环，返回入环节点。

**思路**：
1. 使用快慢指针判断链表是否有环。
2. 如果有环，找到入环节点。
3. 返回入环节点。
4. 如果没有环，返回null。

**代码实现**
[测试链接](https://leetcode.cn/problems/linked-list-cycle-ii/)
```java
public static ListNode detectCycle(ListNode head) {
    if (head == null || head.next == null) {
        return null;
    }

    ListNode slow = head, fast = head;
    // 判断是否有环
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) {
            break;
        }
    }

    // 如果没有环，返回null
    if (fast == null || fast.next == null) {
        return null;
    }

    // 找到入环节点
    slow = head;
    while (slow != fast) {
        slow = slow.next;
        fast = fast.next;
    }

    return slow;
}
``` 

### 在链表上排序
**背景**：给定一个链表，对其进行排序。

**思路**：
1. 使用归并排序对链表进行排序。
2. 递归地将链表分成两半，排序后合并。
3. 返回排序后的链表。

**代码实现**
[测试链接](https://leetcode.cn/problems/sort-list/)
```java
public static ListNode sortList(ListNode head) {
    if (head == null || head.next == null) {
        return head;
    }

    // 使用快慢指针找到中点
    ListNode slow = head, fast = head, prev = null;
    while (fast != null && fast.next != null) {
        prev = slow;
        slow = slow.next;
        fast = fast.next.next;
    }
    prev.next = null; // 切断链表

    // 递归排序两半链表
    ListNode l1 = sortList(head);
    ListNode l2 = sortList(slow);

    // 合并两个排序后的链表
    return merge(l1, l2);
}

public static ListNode merge(ListNode l1, ListNode l2) {
    ListNode dummy = new ListNode(0);
    ListNode curr = dummy;

    while (l1 != null && l2 != null) {
        if (l1.val < l2.val) {
            curr.next = l1;
            l1 = l1.next;
        } else {
            curr.next = l2;
            l2 = l2.next;
        }
        curr = curr.next;
    }

    if (l1 != null) {
        curr.next = l1;
    } else {
        curr.next = l2;
    }

    return dummy.next;
}
```

## 注意
1. 链表类题目需要多练习，熟悉各种操作和技巧
2. 掌握快慢指针的使用方法
3. 多写代码，提升coding能力