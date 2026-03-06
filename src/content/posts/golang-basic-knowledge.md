---
title: Golang基础知识
published: 2025-03-06
date: 2025-03-06
pinned: true
description: 介绍Golang的基础类型和常用的分支语句，帮助初学者快速入门Golang编程。
tags: [Golang, 基础知识]
categor: Golang
licenseName: Unlicensed
draft: true
---

Golang是一种开源的编程语言，由Google开发，具有简洁、高效和并发编程的特点。本文将介绍Golang的基础类型和常用的分支语句，帮助初学者快速入门Golang编程。

本文不介绍Golang的安装和环境配置，如果你还没有安装Golang，可以参考该[文档](https://blog.csdn.net/qq_38105536/article/details/142635132 "安装教程")进行安装。


# Golang开发的开始
作为学习一种编程语言的开端，首先需要了解Golang的文件结构和基本的语法规则。Golang的源代码文件以`.go`为后缀，通常包含一个`package`声明和一个`main`函数作为程序的入口点。

```go
package main // 声明包名，main表示这是一个可执行程序
import "fmt" // 导入fmt包，用于格式化输出
func main() {// main函数是程序的入口点
    fmt.Println("Hello, World!")
}
```

在上面的代码中，我们声明了一个名为`main`的包，并导入了`fmt`包来使用其中的函数。`main`函数是程序的入口点，当我们运行这个程序时，它会输出"Hello, World!"。

# Golang的基础类型
## 值类型
Go有多种值类型，包括字符串、整型、浮点型、布尔型等，下面是一些基础的例子
```go
package main

import "fmt"

func main() {
	fmt.Println("go" + "lang") // 字符串连接

	fmt.Println("1+1 =", 1+1) 

	fmt.Println("7.0/3.0 =", 7.0/3.0)// 整型和浮点数

	fmt.Println(true && false)
	fmt.Println(true || false)
	fmt.Println(!true) // 布尔类型及常见的布尔操作
}
```

在上面的代码中，我们展示了字符串连接、整数和浮点数的运算，以及布尔类型的常见操作。Go的类型系统非常强大，可以帮助我们在编译时捕获许多错误，提高代码的安全性和可靠性。

## 变量与常量
### 变量
在Go中，变量和常量的声明方式非常灵活，可以使用`var`关键字来声明变量，使用`const`关键字来声明常量。Go还支持类型推断，可以根据初始值自动推断变量的类型。

```go
package main

import "fmt"

func main() {
	var a = "initial"
	fmt.Println(a)

	var b, c int = 1, 2
	fmt.Println(b, c)

	var d = true
	fmt.Println(d)

	var e int
	fmt.Println(e)// 标准的变量声明方式，使用var关键字，可以同时声明多个变量，并且可以指定类型或者让编译器自动推断类型

	f := "short"
	fmt.Println(f) // := 是Go语言中的短变量声明语法，可以在函数内部使用，编译器会根据初始值自动推断变量的类型
}
```

在上面的代码中，我们展示了不同类型的变量的声明方式。Go支持多变量声明和类型推断，使得代码更加简洁和易读。

### 常量

Go还支持常量的声明，常量在程序运行时不能被修改，可以使用`const`关键字来声明常量。

```go
package main

import (
	"fmt"
	"math"
)

const s string = "constant"

func main() {
	fmt.Println(s)

	const n = 500000000
	const d = 3e20 / n
	fmt.Println(d)

	fmt.Println(int64(d))

	fmt.Println(math.Sin(n))
}
```

## 分支及循环语句
### 循环语句
Go语言中只存在一种循环语句，即`for`循环。`for`循环可以用来实现各种类型的循环，包括传统的三部分循环、范围循环和无限循环。与其他语言类似，Go的`for`循环也支持`break`和`continue`语句来控制循环的执行。

```go
package main

import "fmt"

func main() {

	i := 1

	for i <= 3 {
		fmt.Println(i)
		i = i + 1
	} //单个条件，类似于while循环

	fmt.Println("-----part 1 end-----")

	for j := 7; j <= 9; j++ {
		fmt.Println(j)
	} //经典的for循环

	fmt.Println("-----part 2 end-----")

	for {
		fmt.Println("loop")
		break
	} //无限循环 = while(true)

	fmt.Println("-----part 3 end-----")

	for n := 0; n <= 5; n++ {
		if n%2 == 0 {
			continue
		}
		fmt.Println(n)
	}//使用continue跳过偶数
}
```

在上面的代码中，我们展示了三种不同的`for`循环形式：单条件循环、经典的三部分循环和无限循环。我们还使用了`break`语句来退出循环，以及`continue`语句来跳过某些迭代。

### 分支语句
Go语言中的分支语句主要有`if`语句和`switch`语句。`if`语句用于根据条件执行不同的代码块，而`switch`语句则用于根据一个表达式的值执行不同的代码块。

#### if语句
if语句的基本结构与其他语言类似，但Go的if语句还支持在条件判断之前执行一个初始化语句，这个语句的作用域仅限于if语句块内。

```go
package main

import "fmt"

func main() {
	if 7%2 == 0 {
		fmt.Println("7 is even")
	} else {
		fmt.Println("7 is odd")
	}// if-else语句，根据条件判断7是偶数还是奇数

	if 8%4 == 0 {
		fmt.Println("8 is divisible by 4")
	}// if语句可以没有else部分，如果条件不满足，程序会继续执行后面的代码

	if num := 9; num < 0 {
		fmt.Println(num, "is negative")
	} else if num < 10 {
		fmt.Println(num, "has 1 digit")
	} else {
		fmt.Println(num, "has multiple digits")
	}// if语句中可以包含一个初始化语句，这个语句在条件判断之前执行，作用域仅限于if语句块内
}
```

#### switch语句
switch语句用于根据一个表达式的值执行不同的代码块。但是Go的switch语句比其他语言更强大，它不仅支持单个值的匹配，还支持多个值的匹配、没有表达式的switch以及类型断言的switch。

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	i := 2
	fmt.Print("Write ", i, " as ")
	switch i {
	case 1:
		fmt.Println("one")
	case 2:
		fmt.Println("two")
	case 3:
		fmt.Println("three")
	}// switch语句根据变量i的值执行不同的代码块

	switch time.Now().Weekday() {
	case time.Saturday, time.Sunday:
		fmt.Println("It's the weekend")
	default:
		fmt.Println("It's a weekday")
	}// switch语句可以同时匹配多个值，例如在上面的例子中，case time.Saturday, time.Sunday同时匹配周六和周日

	t := time.Now()
	switch {
	case t.Hour() < 12:
		fmt.Println("It's before noon")
	default:
		fmt.Println("It's after noon")
	}// switch语句还可以没有表达式，这时它会匹配第一个为true的case，例如在上面的例子中，根据当前时间的小时数判断是上午还是下午

	whatAmI := func(i interface{}) {
		switch t := i.(type) {
		case bool:
			fmt.Println("I'm a bool")
		case int:
			fmt.Println("I'm an int")
		default:
			fmt.Printf("Don't know type %T\n", t)
		}
	}// switch语句还可以使用类型断言来判断接口变量的具体类型，例如在上面的例子中，根据输入参数的类型判断它是布尔值、整数还是其他类型

	whatAmI(true)
	whatAmI(1)
	whatAmI("hey")
}
```

在上面的代码中，我们展示了switch语句的多种用法，包括单值匹配、多个值匹配、没有表达式的switch以及类型断言的switch。Go的switch语句非常灵活，可以帮助我们编写更清晰和更高效的代码。

## 数据结构
Go语言提供了多种内置的数据结构，包括数组、切片、map等，此处只介绍常见的几种

### 数组
数组是具有固定长度的同类型元素的集合。在Go中，数组的长度是数组类型的一部分，这意味着不同长度的数组是不同的类型。

```go
package main

import "fmt"

func main() {
	var a [5]int
	fmt.Println("emp:", a)

	a[4] = 100
	fmt.Println("set:", a)
	fmt.Println("get:", a[4])

	fmt.Println("len:", len(a))

	b := [5]int{1, 2, 3, 4, 5}
	fmt.Println("dcl:", b)

	var twoD [3][3]int
	for i := 0; i < 3; i++ {
		for j := 0; j < 3; j++ {
			twoD[i][j] = i + j + 2
		}
	}

	fmt.Println("2d: ", twoD)
}
```

在上面的代码中，我们展示了数组的声明、访问和初始化方式。我们还创建了一个二维数组，并使用嵌套循环来填充它的值。

:::caution
使用fmt.Println打印数组时，Go会以一[v1, v2, v3, ...]的格式输出数组的元素。
:::

### 切片
切片是对数组的一个动态视图，切片的长度可以改变，并且切片的底层数组可以共享。切片提供了更灵活和强大的功能，通常比数组更常用。

```go
package main

import "fmt"

func main() {
	s := make([]string, 3)
	fmt.Println("emp:", s)

	s[0] = "a"
	s[1] = "b"
	s[2] = "c"
	fmt.Println("set:", s)
	fmt.Println("get:", s[2])

	fmt.Println("len:", len(s))

	s = append(s, "d")
	s = append(s, "e", "f")
	fmt.Println("apd:", s)// 使用append函数向切片添加元素，注意append函数会返回一个新的切片，需要接收返回值

	c := make([]string, len(s))
	copy(c, s)
	fmt.Println("cpy:", c)

	l := s[2:5]
	fmt.Println("sl1:", l)

	l = s[:5]
	fmt.Println("sl2:", l)

	l = s[2:]
	fmt.Println("sl3:", l)

	t := []string{"g", "h", "i"}
	fmt.Println("dcl:", t)

	twoD := make([][]int, 3)
	for i := 0; i < 3; i++ {
		innerLen := i + 1
		twoD[i] = make([]int, innerLen)
		for j := 0; j < innerLen; j++ {
			twoD[i][j] = i + j
		}
	}
	fmt.Println("2d: ", twoD)
}
```

在上面的代码中，我们展示了切片的创建、访问、追加和复制方式。我们还演示了如何使用切片来创建一个二维切片，并使用嵌套循环来填充它的值。

:::caution
>切片的底层数组是共享的，这意味着如果你创建了一个切片并修改了它的元素，那么所有引用这个底层数组的切片都会看到这个修改。
>
>切片和数组是不同的类型，但是打印切片时，Go会以与数组相同的格式输出切片的元素。
:::

### Map
map是Go内建的一种关联数据类型，其他语言中也称为字典或哈希表。map将键映射到值，键必须是可比较的类型，而值可以是任意类型。

```go
package main

import "fmt"

func main() {
	m := make(map[string]int) // 创建一个空的map，键是string类型，值是int类型

	m["k1"] = 7
	m["k2"] = 13

	fmt.Println("map:", m)

	v1 := m["k1"]
	fmt.Println("v1: ", v1)

	fmt.Println("len:", len(m))

	delete(m, "k2")
	fmt.Println("map:", m)

	_, prs := m["k2"]
	fmt.Println("prs:", prs)// 使用delete函数删除map中的键值对，使用逗号ok语法检查一个键是否存在于map中，如果存在，prs将为true，否则为false

	n := map[string]int{"foo": 1, "bar": 2}
	fmt.Println("map:", n)
}
```

在上面的代码中，我们展示了map的创建、访问、删除和初始化方式。我们还演示了如何使用逗号ok语法来检查一个键是否存在于map中。

:::caution
>map的键必须是可比较的类型，例如字符串、整数、布尔值等，而不能是切片、函数或map等不可比较的类型。
>
>打印map时，Go会以map[key1:value1 key2:value2 ...]的格式输出map的键值对。
:::

# 总结
本文介绍了Golang的基础类型和常用的分支语句，包括值类型、变量与常量、循环语句和分支语句。通过这些基础知识，初学者可以开始编写简单的Golang程序，并逐步深入学习更高级的Golang特性和应用。