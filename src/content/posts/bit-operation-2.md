---
title: 使用位运算实现加减乘除
published: 2026-02-01
date: 2026-02-01
pinned: false
description: 使用位运算实现加减乘除的基本方法
tags: [数据结构,算法,位运算]
category: 算法
licenseName: "Unlicensed"
draft: false
---

**使用Python语言需要自己手动处理溢出与符号扩展等问题**

**若非特殊标记，本文代码块均使用Java语言编写**


使用位运算实现基本的加减乘除运算是一种常见的编程技巧，特别是在底层编程和嵌入式系统中。位运算通常比传统的算术运算更高效，因为它们直接操作二进制位，而不涉及复杂的算术逻辑。

本文基于左程云老师的[算法讲解视频](https://www.bilibili.com/video/BV1up4y1g7d8/?share_source=copy_web&vd_source=244da970c0c9dc0aaf29a16589050a20 "使用位运算实现加减乘除")总结

# 使用位运算实现加法
## 原理
可以使用位运算实现两个整数的加法，主要利用按位与（AND）和按位异或（XOR）运算。这也是串行进位加法器的基本原理。可以进一步优化为直接计算出进位的超前进位加法器。
1. 按位异或（XOR）操作可以计算出不考虑进位的部分和。
2. 按位与（AND）操作并左移一位可以计算出进位部分。
3. 重复上述步骤，直到没有进位为止。

## 代码实现
```java
public class BitwiseAddition {
    public static int add(int a, int b) {
        while (b != 0) {
            int carry = a & b; // 计算进位
            a = a ^ b;         // 计算不考虑进位的和
            b = carry << 1;    // 将进位左移一位
        }
        return a;
    }

    public static void main(String[] args) {
        int num1 = 15;
        int num2 = 27;
        System.out.println("Sum: " + add(num1, num2)); // 输出42
    }
}
```

# 使用位运算实现减法
## 原理

减法可以通过加法和取反来实现。根据二进制补码的原理，a - b 可以转换为 a + (~b + 1)。

## 代码实现
```java
public class BitwiseSubtraction {
    public static int subtract(int a, int b) {
        return add(a, add(~b, 1)); // a - b = a + (~b + 1)
    }

    public static int add(int a, int b) {
        while (b != 0) {
            int carry = a & b;
            a = a ^ b;
            b = carry << 1;
        }
        return a;
    }

    public static void main(String[] args) {
        int num1 = 30;
        int num2 = 12;
        System.out.println("Difference: " + subtract(num1, num2)); // 输出18
    }
}
```  

# 使用位运算实现乘法
## 原理
乘法可以通过位移和加法来实现。具体步骤如下：
1. 初始化结果为0。
2. 遍历乘数的每一位，如果当前位为1，则将被乘数左移相应的位数并加到结果中。
3. 最终结果即为乘积。

## 代码实现
```java
public class BitwiseMultiplication {
    public static int multiply(int a, int b) {
        int result = 0;
        while (b != 0) {
            if ((b & 1) != 0) { // 如果b的最低位是1
                result = add(result, a); // 将a加到结果中
            }
            a <<= 1; // 被乘数左移一位
            b >>>= 1; // 乘数无符号右移一位
        }
        return result;
    }

    public static int add(int a, int b) {
        while (b != 0) {
            int carry = a & b;
            a = a ^ b;
            b = carry << 1;
        }
        return a;
    }

    public static void main(String[] args) {
        int num1 = 6;
        int num2 = 7;
        System.out.println("Product: " + multiply(num1, num2)); // 输出42
    }
}
``` 

# 使用位运算实现除法
## 原理
从高到低讨论被除数的每一位，如果当前位大于等于除数，则将对应位的商位置1，并从被除数中减去除数左移相应的位数。

## 代码实现
```java
public class BitwiseDivision {
    public static int div(int dividend, int divisor) {
        if (divisor == 0) throw new ArithmeticException("Division by zero");
        dividend = dividend < 0 ? add(~dividend, 1) : dividend;
        divisor = divisor < 0 ? add(~divisor, 1) : divisor;
        int quotient = 0;

        for (int i = 30; i >= 0; i--) {
            if ((dividend >> i) >= divisor) {
                quotient |= (1 << i);
                dividend = subtract(dividend, divisor << i);
            }
        }
        return dividend < 0 ^ divisor < 0 ? add(~quotient, 1) : quotient;
    }

    //考虑特殊情况，如最大值或最小值
	public static int divide(int a, int b) {
		if (a == MIN && b == MIN) {
			// a和b都是整数最小
			return 1;
		}
		if (a != MIN && b != MIN) {
			// a和b都不是整数最小，那么正常去除
			return div(a, b);
		}
		if (b == MIN) {
			// a不是整数最小，b是整数最小
			return 0;
		}
		// a是整数最小，b是-1，返回整数最大，因为题目里明确这么说了
		if (b == neg(1)) {
			return Integer.MAX_VALUE;
		}
		// a是整数最小，b不是整数最小，b也不是-1
		a = add(a, b > 0 ? b : neg(b));
		int ans = div(a, b);
		int offset = b > 0 ? neg(1) : 1;
		return add(ans, offset);
	}

    public static void main(String[] args) {
        int dividend = 42;
        int divisor = 6;
        System.out.println("Quotient: " + divide(dividend, divisor)); // 输出7
    }
}
```

# 整体代码展示
```java
public class BitwiseOperations {
	public static int MIN = Integer.MIN_VALUE;

	public static int divide(int a, int b) {
		if (a == MIN && b == MIN) {
			// a和b都是整数最小
			return 1;
		}
		if (a != MIN && b != MIN) {
			// a和b都不是整数最小，那么正常去除
			return div(a, b);
		}
		if (b == MIN) {
			// a不是整数最小，b是整数最小
			return 0;
		}
		// a是整数最小，b是-1，返回整数最大，因为题目里明确这么说了
		if (b == neg(1)) {
			return Integer.MAX_VALUE;
		}
		// a是整数最小，b不是整数最小，b也不是-1
		a = add(a, b > 0 ? b : neg(b));
		int ans = div(a, b);
		int offset = b > 0 ? neg(1) : 1;
		return add(ans, offset);
	}

	// 必须保证a和b都不是整数最小值，返回a除以b的结果
	public static int div(int a, int b) {
		int x = a < 0 ? neg(a) : a;
		int y = b < 0 ? neg(b) : b;
		int ans = 0;
		for (int i = 30; i >= 0; i = minus(i, 1)) {
			if ((x >> i) >= y) {
				ans |= (1 << i);
				x = minus(x, y << i);
			}
		}
		return a < 0 ^ b < 0 ? neg(ans) : ans;
	}

	public static int add(int a, int b) {
		int ans = a;
		while (b != 0) {
			// ans : a和b无进位相加的结果
			ans = a ^ b;
			// b : a和b相加时的进位信息
			b = (a & b) << 1;
			a = ans;
		}
		return ans;
	}

	public static int minus(int a, int b) {
		return add(a, neg(b));
	}

	public static int neg(int n) {
		return add(~n, 1);
	}

	// 这种乘法后面有大用处，尤其是求(a的b次方 % m)的结果，也叫龟速乘
	public static int multiply(int a, int b) {
		int ans = 0;
		while (b != 0) {
			if ((b & 1) != 0) {
				// 考察b当前最右的状态！
				ans = add(ans, a);
			}
			a <<= 1;
			b >>>= 1;
		}
		return ans;
	}

}
```