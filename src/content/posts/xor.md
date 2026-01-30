---
title: 异或运算的介绍及进阶使用方式
published: 2026-01-29
date: 2026-01-29
pinned: false
description: 异或运算运算符介绍及其进阶使用方式
tags: [数据结构，算法, 位运算]
category: 算法
licenseName: "Unlicensed"
draft: false
---

**使用Python语言需要自己手动处理溢出与符号扩展等问题**
**若非特殊标记，本文代码块均使用Java语言编写**

异或运算是计算机中非常基础且高效的操作，常用于底层编程、性能优化以及某些算法实现中。以下是一些异或运算的进阶使用方式

本文基于左程云老师的[算法讲解视频](https://www.bilibili.com/video/BV1LN411z7nu/?share_source=copy_web&vd_source=244da970c0c9dc0aaf29a16589050a20 "异或运算的骚操作")总结

# 异或运算
## 异或运算的介绍
**定义**：a ^ b为a与b按位异或的结果
真值表如下
| A | B | A ^ B |
|---|---|-------|
| 0 | 0 |   0   |
| 0 | 1 |   1   |
| 1 | 0 |   1   |
| 1 | 1 |   0   |

**性质**：
1. 交换律：a ^ b = b ^ a
2. 结合律：(a ^ b) ^ c = a ^ (b ^ c)
3. 恒等律：a ^ 0 = a
4. 自反律：a ^ a = 0
5. **异或运算就是无进位相加**，即二进制下的每一位分别相加，不考虑进位，例如：
   - 5 ^ 3 = 6 
   - 0101 + 0011 = 0110(即6)
6. 整体异或和如果是x,某个部分异或和为y，那么另一个部分异或和为x^y

## 问题引入
**问题描述**：袋子里一共a个白球，b个黑球，每次从袋子里随机取出两个球，如果颜色相同则放回一个白球，否则放回一个黑球。问最后袋子里剩下的球是黑色的概率

**解题思路**：
1. 观察发现，每次取出两个球后，袋子里球的总数会减少1，直到最后只剩下一个球。可以记白球为0，黑球为1。
2. 关键在于分析黑球的数量变化：
   - 取出两个白球（WW）：放回一个白球，黑球数量不变。即0 ^ 0 = 0
   - 取出两个黑球（BB）：放回一个白球，黑球数量减少2。即1 ^ 1 = 0
   - 取出一个白球和一个黑球（WB或BW）：放回一个黑球，黑球数量不变。即0 ^ 1 = 1
   - 将原有的数量排列写为二进制串，每次随机取出两个球的操作相当于对这串二进制进行异或操作，最终剩下的球的颜色由初始黑球数量的奇偶性决定。
3. 由此可见，因此，黑球的奇偶性决定了最后剩下的球的颜色：
   - 如果初始黑球数量为偶数，最后剩下的球一定是白色。
   - 如果初始黑球数量为奇数，最后剩下的球一定是黑色。

**结论**：最后袋子里剩下的球是黑色的概率为1当且仅当初始黑球数量为奇数，否则为0。记黑球为1，白球为0，则最后剩下的球的颜色可以通过初始黑球数量的异或和来决定。即可以通过计算黑球数量的奇偶性来直接得出结果。

**代码实现**
```java
public class BagBalls {
    public static String lastBallColor(int whiteBalls, int blackBalls) {
        // 判断黑球数量的奇偶性
        if (blackBalls % 2 == 0) {
            return "White"; // 偶数个黑球，最后剩下白球
        } else {
            return "Black"; // 奇数个黑球，最后剩下黑球
        }
    }

    public static void main(String[] args) {
        int whiteBalls = 5;
        int blackBalls = 3;
        System.out.println("Last ball color: " + lastBallColor(whiteBalls, blackBalls));
    }
}
```

## 异或运算的其他应用
### 交换两个数
**原理**：给定两个数a,b,可以得到c = a ^ b，进一步可以从c中恢复出a和b，即a = c ^ b, b = c ^ a

**代码实现**
```java
public class SwapNumbers {
    public static void main(String[] args) {
        int a = 5; // 0101
        int b = 3; // 0011

        // 交换过程
        a = a ^ b; // 计算得到c
        b = a ^ b; // 恢复a
        a = a ^ b; // 恢复b

        System.out.println("After swap: a = " + a + ", b = " + b);
    }
}
```

### 返回两个数中最大值
**原理**：按照一定顺序进行处理，假定两个数均为32bit有符号整数：
- 计算diff = a - b
- 获取符号位sign = (diff >> 31) & 1
- 根据sign选择返回a或b
  
**代码实现**
[测试链接](https://www.nowcoder.com/practice/d2707eaf98124f1e8f1d9c18ad487f76)
```java
public class MaxOfTwo{
    // 保证n一定为0或1
    public static int flip(int n){
        return n ^ 1;
    }

    // 非负数返回1，负数返回0
    public static int sign(int n){
        return flip(n >>> 31);
    }

    public static int getMax(int a, int b){
        int c = a - b;
        int sa = sign(a); // a的符号
        int sb = sign(b); // b的符号
        int sc = sign(c); // a-b的符号
        int diffAB = sa ^ sb; // a和b符号是否不同
        int sameSign = flip(diffAB); // a和b符号是否相同
        int returnA = diffAB * sa + sameSign * sc; // 返回a的条件
        int returnB = flip(returnA); // 返回b的条件
        return returnA * a + returnB * b;
    }
}
```

### 找到缺失的数
**背景**：给定一个包含0到n中n个数的数组，找出缺失的那个数

**原理**：利用异或运算的性质，将数组中的所有数（即部分异或和）与0到n的所有数（所有的异或和）进行异或操作，最终结果即为缺失的数

**代码实现**
[测试链接](https://leetcode.cn/problems/missing-number/)
```java
Public class MissingNumber {
    public static int findMissingNumber(int[] nums) {
        int n = nums.length;
        int xorAll = 0;
        int xorArray = 0;

        // 计算0到n的异或和
        for (int i = 0; i <= n; i++) {
            xorAll ^= i;
        }

        // 计算数组中所有数的异或和
        for (int num : nums) {
            xorArray ^= num;
        }

        // 缺失的数即为两者的异或结果
        return xorAll ^ xorArray;
    }

    public static void main(String[] args) {
        int[] nums = {3, 0, 1};
        System.out.println("Missing number: " + findMissingNumber(nums));
    }
}
```

### 数组中唯一一个奇数次出现的数
**背景**：给定一个数组，数组中只有一个数出现了奇数次，其他数均出现了偶数次，找出这个数

**原理**：利用异或运算的性质，所有出现偶数次的数异或结果为0，最终结果即为出现奇数次的数

**代码实现**
[测试链接](https://leetcode.cn/problems/single-number/)
```java
public class SingleNumber {
    public static int findSingle(int[] nums) {
        int result = 0;
        for (int num : nums) {
            result ^= num; // 累计异或
        }
        return result; // 最终结果为出现奇数次的数
    }

    public static void main(String[] args) {
        int[] nums = {4, 1, 2, 1, 2};
        System.out.println("Single number: " + findSingle(nums));
    }
}
```

### 找出唯二出现奇数次的数
**背景**：给定一个数组，数组中只有两个数出现了奇数次，其他数均出现了偶数次，找出这两个数

**原理**：
1. 首先对整个数组进行异或操作，得到的结果为这两个奇数次出现的数的异或结果x ^ y
2. 提取结果中最右位的1，作为区分这两个数的标志位
3. 根据标志位将数组分成两组，分别对每组进行异或操作，最终得到的结果即为这两个数

**代码实现**
[测试链接](https://leetcode.cn/problems/single-number-iii/)
```java
public class TwoSingleNumbers {
    public static int[] findTwoSingles(int[] nums) {
        int xorResult = 0;
        for (int num : nums) {
            xorResult ^= num; // 得到x ^ y
        }

        // 提取最右位的1
        int rightmostSetBit = xorResult & (~xorResult + 1);

        int num1 = 0, num2 = 0;
        for (int num : nums) {
            if ((num & rightmostSetBit) == 0) {
                num1 ^= num; // 第一组
            }
        }

        return new int[]{num1, xorResult ^ num1}; // 第二组
    }
 
    public static void main(String[] args) {
        int[] nums = {4, 1, 2, 1, 2, 3};
        int[] result = findTwoSingles(nums);
        System.out.println("Two single numbers: " + result[0] + ", " + result[1]);
    }
}
```

### 找唯一的出现次数小于m的数
**背景**：给定一个数组，数组中只有一个数出现了k次，其他数均出现了m次（k < m），找出这个数

**原理**：
1. 统计每一位上1的个数
2. 对每一位的1的个数对m取模，剩下的结果即为出现k次的数在该位上的值
3. 将所有位的结果组合起来，得到最终的数

**代码实现**
[测试链接](https://leetcode.cn/problems/single-number-ii/)此处为m=3的特例，实际上更为通用
```java
public class UniqueNumber {
    public static int findUnique(int[] nums, int k, int m) {
        int[] bitCount = new int[32];

        // 统计每一位上1的个数
        for (int num : nums) {
            for (int i = 0; i < 32; i++) {
                bitCount[i] += (num >> i) & 1;
            }
        }

        int result = 0;
        // 对每一位的1的个数对m取模
        for (int i = 0; i < 32; i++) {
            if (bitCount[i] % m != 0) {
                result |= (1 << i);
            }
        }

        return result;
    }

    public static void main(String[] args) {
        int[] nums = {2, 2, 3, 2, 5, 5, 5};
        int k = 1; // 出现次数
        int m = 3; // 其他数出现次数
        System.out.println("Unique number: " + findUnique(nums, k, m));
    }
}
```




