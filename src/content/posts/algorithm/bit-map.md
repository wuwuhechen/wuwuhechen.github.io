---
title: 位图介绍与实现
published: 2026-02-02
date: 2026-02-02
pinned: false
description: 位图的数据结构介绍与实现方法
tags: [数据结构,算法,位运算]
category: 算法
licenseName: "Unlicensed"
draft: false
---

**使用Python语言需要自己手动处理溢出与符号扩展等问题**

**若非特殊标记，本文代码块均使用Java语言编写**

本文基于左程云老师的[算法讲解视频](https://www.bilibili.com/video/BV1yr4y1Z7jb/?share_source=copy_web&vd_source=244da970c0c9dc0aaf29a16589050a20 "位图介绍")总结

# 位图
## 位图介绍
位图（Bit Map）是一种用于高效存储和操作大量布尔值（true/false）的数据结构。它使用位数组来表示数据，每个位对应一个布尔值，节省了存储空间并提高了操作效率。位图常用于需要快速查找、插入和删除操作的场景，如数据库索引、缓存系统和集合操作等。

## 位图原理
其实就是用整数的二进制位 来表示布尔值。每个位的位置对应一个元素的索引，位的值（0或1）表示该元素是否存在或满足某个条件。取值和存值操作都用位运算

限制是必须为连续范围且不能过大，好处是节省空间且操作快

## 位图的实现
### 外部接口
1. Bitset(int size)：初始化位图，只支持0到size-1范围内的数的增删改查
2. void add(int num)：将num加入位图，将num对应的位置设为1
3. void remove(int num)：将num移出位图，将num对应的位置设为0
4. void reverse(int num)：将num对应的位置取反
5. boolean contains(int num)：检查num是否在位图中
   
### 代码实现
```java
public class Bitset{
    public int[] set;

    public Bitset(int  n){
        // a/b如果想向上取整，可以写成(a + b - 1) / b
        // 前提是a和b都是正数
        set = new int[(n + 31) / 32];
    }

    public void add(int num){
        set[num / 32] |= (1 << (num % 32));
    }

    public void remove(int num){
        set[num / 32] &= ~(1 << (num % 32));
    }

    public void reverse(int num){
        set[num / 32] ^= (1 << (num % 32));
    }

    public boolean contains(int num){
        return (set[num / 32] & (1 << (num % 32))) != 0;
    }
}
```

## 对数器测试
**原理**：使用Java自带的HashSet作为对数器，进行随机测试，验证位图的正确性，作为对照，可以使用bitset和HashSet进行相同的操作，最后对比结果是否一致。

```java
import java.util.HashSet;
import java.util.Random;

public class BitsetTest {
    public static void main(String[] args) {
        int testTimes = 10000;
        int size = 1000;
        
        System.out.println("开始测试");
        Bitset bitset = new Bitset(size);
        HashSet<Integer> hashSet = new HashSet<>();

        for(int i = 0; i < testTimes; i++){
            double decide = Math.random();
            int number = (int)(Math.random() * size);
            if(deside < 0.333){
                bitset.add(number);
                hashSet.add(number);
            } else if(deside < 0.666){
                bitset.remove(number);
                hashSet.remove(number);
            } else {
                bitset.reverse(number);
                if(hashSet.contains(number)){
                    hashSet.remove(number);
                } else {
                    hashSet.add(number);
                }
            }
        }
        System.out.println("调用阶段结束");
        System.out.println("开始对比结果");
        for(int i = 0; i < size; i++){
            if(bitset.contains(i) != hashSet.contains(i)){
                System.out.println("出错了！");
            }
        }
        System.out.println("对比结束");
        System.out.println("测试结束");
    }
}
```