---
title: 位运算的介绍及进阶使用方式
published: 2026-01-31 
date: 2026-01-29
pinned: false
description: 位运算运算符介绍及其进阶使用方式
tags: [数据结构, 算法, 位运算]
category: 算法
licenseName: "Unlicensed"
draft: false
---

**使用Python语言需要自己手动处理溢出与符号扩展等问题**

**若非特殊标记，本文代码块均使用Java语言编写**

位运算是一种直接对整数的二进制位进行操作的运算方式。它们在计算机科学中非常重要，因为计算机底层是以二进制形式存储和处理数据的。位运算通常比其他类型的运算（如加法、减法等）更快，因此在某些性能关键的应用中，位运算被广泛使用。

本文基于左程云老师的[算法讲解视频](https://www.bilibili.com/video/BV1ch4y1Q7vd/?share_source=copy_web&vd_source=244da970c0c9dc0aaf29a16589050a20 "位运算的骚操作")总结

# 位运算
## 位运算的介绍
位运算符用于对整数的二进制位进行操作。常见的位运算符包括：
1. 按位与（AND，&）：对两个数的每一位执行
2. 按位或（OR，|）：对两个数的每一位执行
3. 按位异或（XOR，^）：对两个数的每一位执行
4. 按位取反（NOT，~）：对一个数的每一位执行

**按位与（AND，&）**：只有当两个对应的二进制位都为1时，结果位才为1，否则为0。
真值表如下
| A | B | A & B |
|---|---|-------|
| 0 | 0 |   0   |
| 0 | 1 |   0   |
| 1 | 0 |   0   |
| 1 | 1 |   1   |

**按位或（OR，|）**：只要两个对应的二进制位中有一个为1，结果位就为1，否则为0。
真值表如下
| A | B | A \| B |
|---|---|-------|
| 0 | 0 |   0   |
| 0 | 1 |   1   |
| 1 | 0 |   1   |
| 1 | 1 |   1   |

**按位异或（XOR，^）**：当两个对应的二进制位不同时，结果位为1，否则为0。
真值表如下
| A | B | A ^ B |
|---|---|-------|
| 0 | 0 |   0   |
| 0 | 1 |   1   |
| 1 | 0 |   1   |
| 1 | 1 |   0   |

**按位取反（NOT，~）**：将数的每一位取反，即0变1，1变0。
真值表如下
| A | ~A |
|---|----|
| 0 | 1  |
| 1 | 0  |

## 位运算的进阶使用方式
位运算不仅仅用于基本的按位操作，还可以用于一些高级的算法和技巧。

### 判断一个数是不是2的幂
**原理**：一个数n是2的幂当且仅当n > 0且n & (n - 1) == 0。也可以取出最低位的1来判断，即n & -n == n。

**代码实现**：
[测试链接](https://leetcode.cn/problems/power-of-two/)
```java
public boolean isPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1)) == 0;
}

public boolean isPowerOfTwoAlternative(int n) {
    return n > 0 && (n & -n) == n;
}
```

### 判断一个数是不是3的幂
**原理**：一个数n是3的幂当且仅当n > 0且1162261467 % n == 0（1162261467是3的19次方，是int范围内最大的3的幂）。

**代码实现**：
[测试链接](https://leetcode.cn/problems/power-of-three/)
```java
public boolean isPowerOfThree(int n) {
    return n > 0 && 1162261467 % n == 0;
}
```


### 返回大于等于n的最小2的幂
**原理**：利用位运算快速计算大于等于n的最小2的幂。将n最高位的1后面的所有位都变成1，然后加1即可得到结果。

**代码实现**：
```java
public int nextPowerOfTwo(int n) {
    if (n <= 0) return 1;
    n--;// 先减1，防止n本身就是2的幂
    n |= n >> 1;
    n |= n >> 2;
    n |= n >> 4;
    n |= n >> 8;
    n |= n >> 16;
    return n + 1;
}
```

### 区间内所有数字&运算结果
**背景**：给定两个整数m和n，计算区间[m, n]内所有数字的按位与结果

**原理**：利用按位与运算的性质，只有当两个数的对应位都为1时，结果位才为1。因此，可以通过不断右移m和n，直到它们相等，记录右移的次数，然后将结果左移回去。

**代码实现**
[测试链接](https://leetcode.cn/problems/bitwise-and-of-numbers-range/)
```java
public class RangeBitwiseAnd
{
    public static int rangeBitwiseAnd(int m, int n) {
        while (m < n) {
            n = n & (n - 1);
        }
        return n;
    }

    public static void main(String[] args) {
        int m = 5, n = 7;
        System.out.println("Bitwise AND from " + m + " to " + n + ": " + rangeBitwiseAnd(m, n));
    }
}
```

### 反转一个二进制状态，逆序
**背景**：给定一个整数，反转其二进制表示的位顺序

**原理**：借鉴归并的原理，将整数的二进制位两两交换，然后四四交换，依此类推，直到所有位都交换完毕。

**代码实现**
[测试链接](https://leetcode.cn/problems/reverse-bits/)
```java
public class ReverseBits {
    public static int reverseBits(int n) {
        n = (n >>> 16) | (n << 16);
        n = ((n & 0xff00ff00) >>> 8) | ((n & 0x00ff00ff) << 8);
        n = ((n & 0xf0f0f0f0) >>> 4) | ((n & 0x0f0f0f0f) << 4);
        n = ((n & 0xcccccccc) >>> 2) | ((n & 0x33333333) << 2);
        n = ((n & 0xaaaaaaaa) >>> 1) | ((n & 0x55555555) << 1);
        return n;
    }

    public static void main(String[] args) {
        int n = 43261596; 
        System.out.println("Reversed bits: " + reverseBits(n)); 
    }
}
```  

### 返回一个数二进制中1的个数
**原理**：认为原始二进制存储的是长度为1的范围内1的个数，然后两两合并，四四合并，依此类推，直到所有位都合并完毕。

**代码实现**
[测试链接](https://leetcode.cn/problems/hamming-distance/)
```java
public class HammingWeight {
    public static int hammingWeight(int n) {
        n = (n & 0x55555555) + ((n >>> 1) & 0x55555555);
        n = (n & 0x33333333) + ((n >>> 2) & 0x33333333);
        n = (n & 0x0f0f0f0f) + ((n >>> 4) & 0x0f0f0f0f);
        n = (n & 0x00ff00ff) + ((n >>> 8) & 0x00ff00ff);
        n = (n & 0x0000ffff) + ((n >>> 16) & 0x0000ffff);
        return n;
    }

    public static void main(String[] args) {
        int n = 11; // 二进制表示为1011
        System.out.println("Hamming Weight: " + hammingWeight(n)); // 输出3
    }
}
```
