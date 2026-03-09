---
title: Golang函数的介绍和使用
published: 2025-03-09
date: 2025-03-09
description: 介绍Golang函数的定义、参数传递方式和返回值，帮助初学者理解和使用Golang函数。
tags: [Golang, 基础知识]
category: Golang
draft: false
---

Golang函数是Go语言中的基本构建块，用于封装可重用的代码逻辑。函数可以接受参数并返回结果，使得代码更加模块化和易于维护。本文将介绍Golang函数的定义、参数传递方式和返回值，帮助初学者理解和使用Golang函数。

# Golang函数的定义
在Go中，函数的定义使用`func`关键字，后跟函数名、参数列表和返回值类型。函数体包含在花括号中，函数的执行逻辑写在函数体内。下面是一个简单的函数定义示例：

```go
package main

func plus(a int, b int) int {
	return a + b
}

func plusPlus(a, b, c int) int {
	return a + b + c
}

func main() {
	res := plus(1, 2)
	println("1 + 2 =", res)

	res = plusPlus(1, 2, 3)
	println("1 + 2 + 3 =", res)
}
```

# Golang函数的特性
## 多返回值
大部分语言需要使用结构体或者类来实现多返回值，而Go语言内置了多返回值的支持，使得函数可以直接返回多个值。这在处理错误时非常有用，可以同时返回结果和错误信息。

如下是一个示例，展示了如何使用多返回值：

```go
package main

import "fmt"

func vals() (int, int) {
	return 3, 7
}

func main() {
	a, b := vals()
	fmt.Println(a)
	fmt.Println(b)
	_, c := vals()
	fmt.Println(c)
}
```

在上面的代码中，函数`vals`返回了两个整数值。在`main`函数中，我们使用多重赋值来接收这两个返回值，并且可以选择使用下划线`_`忽略其中一个返回值。

## 变参函数
Go语言支持变参函数，可以接受可变数量的参数。变参参数在函数定义中使用`...`语法表示，变参参数会被视为一个切片。

下面是一个示例，展示了如何定义和使用变参函数：

```go
package main

import "fmt"

func sum(nums ...int) {
	fmt.Print(nums, " ")
	total := 0
	for _, num := range nums {
		total += num
	}
	fmt.Println(total)
}

func main() {
	sum(1, 2)
	sum(1, 2, 3)

	nums := []int{1, 2, 3, 4}
	sum(nums...)
}
```

在上面的代码中，函数`sum`接受一个变参参数`nums`，它可以接受任意数量的整数。在`main`函数中，我们调用了`sum`函数两次，分别传递了不同数量的参数，并且还展示了如何将一个切片作为变参参数传递给函数。

:::caution
> 变参函数只能有一个变参参数，并且必须是函数参数列表中的最后一个参数。如果函数定义中有多个参数，变参参数必须放在最后。
> eg : func example(a int, b ...int) {} // 正确
> func example(a ...int, b int) {} // 错误(因为无法区分变参参数和普通参数)
>
> 变参参数在函数内部被视为一个切片，可以使用切片的相关操作来处理变参参数。
:::

:::note
> 可能有人认为既然fmt.Println函数可以接受任意数量的参数，可以直接使用fmt.Println(nums)来打印切片，应该能将nums作为变参参数传递给变参函数，但实际上这是不行的，因为fmt.Println(nums)会将nums作为一个整体传递给函数，而不是将nums中的元素逐个传递给函数。要将切片中的元素逐个传递给变参函数，需要使用切片展开语法，即在切片变量后面加上三个点（...），如fmt.Println(nums...)。
> 
> eg : 
> fmt.Println(nums) // 输出: [1 2 3 4]
> fmt.Println(nums...) // 输出: 1 2 3 4
> 
> 在上面的代码中，使用fmt.Println(nums)会将nums作为一个整体传递给函数，输出为[1 2 3 4]，而使用fmt.Println(nums...)会将nums中的元素逐个传递给函数，输出为1 2 3 4。
:::

## 闭包
Go语言支持闭包，闭包是一个函数值，它引用了函数体之外的变量。闭包可以访问和修改这些变量，即使它们已经超出了作用域。下面是一个示例，展示了如何使用闭包：

```go
package main

import "fmt"

func intSeq() func() int {
	i := 0
	return func() int {
		i++
		return i
	}// 这里返回的匿名函数是一个闭包，它引用了外部函数intSeq中的变量i
}

func main() {
	nextInt := intSeq()
	fmt.Println(nextInt())
	fmt.Println(nextInt())
	fmt.Println(nextInt())

	newInts := intSeq()
	fmt.Println(newInts())
}

// 输出:
// 1
// 2
// 3
// 1 
```

观察输出可以发现，在执行nextInt()函数时，变量i的值会随着每次调用而增加，因为闭包函数引用了外部函数intSeq中的变量i，所以局部变量i不会在函数执行完毕后被销毁，会随着闭包函数的生命周期而存在。同时不同的闭包函数拥有自己的独立变量，当我们创建一个新的闭包函数newInts时，它会有自己的独立变量i，因此它的输出从1开始。

## 递归
递归是指一个函数直接或间接调用自身的编程技巧。Go语言支持递归函数，可以通过递归来解决一些问题，如计算阶乘、斐波那契数列等。下面是一个示例，展示了如何使用递归函数：

```go
package main

import "fmt"

func fact(n int) int {
	if n == 0 {
		return 1
	}
	return n * fact(n-1)
}

func main() {
	fmt.Println("Factorial of 7 is:", fact(7))

	var fib func(n int) int

	fib = func(n int) int {
		if n <= 1 {
			return n
		}
		return fib(n-1) + fib(n-2)
	} // 这里我们定义了一个匿名函数，并将其赋值给变量fib，这样就可以在函数体内递归调用fib函数了

	fmt.Println("Fibonacci of 7 is:", fib(7))
}
```

在上面的代码中，函数`fact`是一个递归函数，用于计算阶乘。当n为0时，返回1；否则返回n乘以fact(n-1)。函数`fib`也是一个递归函数，用于计算斐波那契数列。当n小于等于1时，返回n；否则返回fib(n-1)加上fib(n-2)。

# 总结
Golang函数是Go语言中的基本构建块，支持多返回值、变参函数、闭包和递归等特性，使得代码更加模块化和易于维护。通过理解和使用这些特性，开发者可以编写更高效、可读性更好的Go代码。希望本文对初学者理解和使用Golang函数有所帮助。