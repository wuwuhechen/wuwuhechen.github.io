---
title: Golang结构体的介绍和使用
published: 2026-03-09
date: 2026-03-09
pinned: false
description: 介绍Golang结构体的定义、字段和方法，帮助初学者理解和使用Golang结构体。
tags: [Golang, 基础知识]
category: Golang
permalink: golang-struct
draft: false
---

Golang结构体是Go语言中的一种复合数据类型，用于将多个相关的字段组合在一起。结构体可以包含不同类型的字段，并且可以定义方法来操作这些字段，使得代码更加模块化和易于维护。本文将介绍Golang结构体的定义、字段和方法，帮助初学者理解和使用Golang结构体。

# Golang结构体的定义
在go语言中，结构体的定义使用`type`关键字，后跟结构体名称和字段列表。字段列表包含字段名和字段类型，字段之间用逗号分隔。下面是一个简单的结构体定义示例：

```go
package main

import "fmt"

type Vertex struct {
	X, Y float64
}// 定义一个名为Vertex的结构体，包含两个字段X和Y，都是float64类型

func newVertex(x, y float64) *Vertex {
	return &Vertex{X: x, Y: y}
}

func main() {
	fmt.Println(Vertex{1, 2})// 创建一个Vertex实例，并打印其值

	fmt.Println(Vertex{X: 1, Y: 2}) // 使用字段名创建一个Vertex实例，并打印其值

	fmt.Println(Vertex{X: 1}) // 只指定X字段，Y字段会被自动赋值为0

	fmt.Println(&Vertex{X: 1, Y: 2}) // 创建一个Vertex实例，并返回其指针

	fmt.Println(newVertex(1, 2)) // 使用newVertex函数创建一个Vertex实例，并返回其指针

	v := Vertex{1, 2}
	fmt.Println(v.X) // 访问结构体字段

	p := &v
	fmt.Println(p.Y) // 通过指针访问结构体字段

	p.X = 1e9
	fmt.Println(p)
	fmt.Println(v) // 结构体是值类型，通过指针修改结构体字段会影响原始结构体实例
}
```

在上面的代码中，我们定义了一个名为`Vertex`的结构体，包含两个字段`X`和`Y`，它们都是`float64`类型。我们还定义了一个函数`newVertex`，用于创建一个新的`Vertex`实例并返回其指针。在`main`函数中，我们展示了不同方式创建和访问结构体实例的示例。

:::note
> 在上述代码中，p是一个指向v的指针，在其他语言中可能需要使用`*p`来访问指针指向的值，但在Go语言中，编译器会自动解引用，所以我们可以直接使用`p.X`来访问字段X。
>
> 在结构体的打印过程中，我们可以发现p虽然是一个指针，但打印出来的结果是结构体的值`&{1000000000 2}`，这也是Go语言中的一个特性，编译器会自动解引用指针来获取结构体的值，同时使用`&`符号来表示这是一个指针。如果需要打印的是指针的地址，可以使用`%p`格式化字符串来打印指针的地址，例如`fmt.Printf("%p\n", p)`。
:::

# 结构体的特性
## 方法
Go语言允许我们为结构体定义方法，这些方法可以操作结构体的字段，使得代码更加模块化和易于维护。方法的定义使用`func`关键字，后跟方法名、参数列表和返回值类型`eg: func (v Vertex) Area() float64`。方法的接收者是一个结构体类型的变量，可以是值类型或者指针类型。下面是一个示例，展示了如何为结构体定义方法：

```go
package main

import "fmt"

type rect struct {
	width, height int
}

func (r *rect) area() int {
	return r.width * r.height
}

func (r rect) perim() int {
	return 2*r.width + 2*r.height
}

func main() {
	r := rect{width: 10, height: 5}

	fmt.Println("Area:", r.area())
	fmt.Println("Perimeter:", r.perim())

	rp := &r
	fmt.Println("Area via pointer:", rp.area())
	fmt.Println("Perimeter via pointer:", rp.perim())
}
```

在上述代码中，我们首先定义了一个结构体`rect`，包含两个字段`width`和`height`。然后我们为这个结构体定义了两个方法：`area`和`perim`，分别计算矩形的面积和周长。在`main`函数中，我们创建了一个`rect`实例，并调用了这两个方法来计算面积和周长，同时我们可以发现无论是通过值类型还是指针类型调用方法，结果都是一样的，这也是Go语言中的一个特性，编译器会自动解引用指针来调用方法。

## 接口
Go语言中的接口是一种抽象类型，它定义了一组方法的集合，但不包含方法的实现。接口可以被任何类型实现，只要该类型实现了接口中定义的所有方法。接口使得代码更加灵活和可扩展，可以实现多态性。下面是一个示例，展示了如何定义和使用接口：

```go
package main

import (
	"fmt"
	"math"
)

// 定义接口需要实现的方法

type geometry interface {
	area() float64
	perim() float64
}

// 定义两个结构体，分别实现geometry接口

type rect struct {
	width, height float64
}

type circle struct {
	radius float64
}

// 实现接口的方法

func (r rect) area() float64 {
	return r.width * r.height
}

func (r rect) perim() float64 {
	return 2*r.width + 2*r.height
}

func (c circle) area() float64 {
	return math.Pi * c.radius * c.radius
}

func (c circle) perim() float64 {
	return 2 * math.Pi * c.radius
}

func measure(g geometry) {
	fmt.Println(g)
	fmt.Println(g.area())
	fmt.Println(g.perim())
}

func main() {
	r := rect{width: 3, height: 4}
	c := circle{radius: 5}

	measure(r)
	measure(c)
}
```

可以发现虽然两个结构体`rect`和`circle`没有任何关系，但它们都实现了`geometry`接口，因此我们可以将它们作为参数传递给`measure`函数，这就是Go语言中的多态性。接口使得代码更加灵活和可扩展，我们可以轻松地添加新的类型来实现接口，而不需要修改现有的代码。

## 嵌入（embedding）
Go语言中的嵌入是一种特殊的结构体字段，它允许我们将一个结构体类型直接嵌入到另一个结构体中，从而实现代码的复用和组合。嵌入的结构体类型的字段和方法会被提升到外层结构体中，使得外层结构体可以直接访问嵌入结构体的字段和方法。下面是一个示例，展示了如何使用嵌入：

```go
package main

import "fmt"

type base struct {
	num int
}

func (b base) describe() string {
	return fmt.Sprintf("Base struct with num: %d", b.num)
}

type container struct {
	base
	name string
}

func main() {

	co := container{
		base: base{num: 42},
		name: "My Container",
	}

	fmt.Printf("co = {num: %v, name: %v}\n", co.num, co.name)

	fmt.Println("also num: ", co.base.num)

	fmt.Println("co.describe() = ", co.describe())

	type describer interface {
		describe() string
	}

	var d describer = co

	fmt.Println("d.describe() = ", d.describe())
}
```

可以发现，虽然`container`结构体没有直接定义`describe`方法，但由于它嵌入了`base`结构体，而`base`结构体定义了`describe`方法，因此我们可以直接调用`co.describe()`来访问这个方法，这就是Go语言中的嵌入特性。同时也可以直接调用类中的数据而不需要使用多重调用，这使得代码更加简洁和易于维护，我们可以通过嵌入来实现代码的复用和组合，而不需要使用继承等复杂的机制。

## 泛型
泛型是Go语言中的一种强大特性，它允许我们编写可以处理不同类型数据的函数和数据结构，而不需要重复编写相似的代码。泛型通过使用类型参数来实现，使得代码更加灵活和可重用。下面是一个示例，展示了如何使用泛型：

```go
package main

import "fmt"

// 定义一个泛型函数，接受一个map类型的参数，并返回一个包含所有键的切片
func MapKeys[k comparable, v any](m map[k]v) []k {
	keys := make([]k, 0, len(m))
	for k := range m {
		keys = append(keys, k)
	}
	return keys
}

// 定义一个泛型结构体，表示一个链表，可以存储任意类型的数据
// 可以认为是表头和表尾的指针
type List[T any] struct {
	head, tail *element[T]
}

// 定义一个结构体，表示链表的元素，包含一个指向下一个元素的指针和一个值
type element[T any] struct {
	next *element[T]
	val  T
}

func (lst *List[T]) Push(v T) {
	if lst.tail == nil {
		lst.head = &element[T]{val: v}
		lst.tail = lst.head
	} else {
		lst.tail.next = &element[T]{val: v}
		lst.tail = lst.tail.next
	}
}

func (lst *List[T]) GetAll() []T {
	var vals []T
	for e := lst.head; e != nil; e = e.next {
		vals = append(vals, e.val)
	}
	return vals
}

func main() {
	var m = map[int]int{1: 10, 2: 20, 3: 30}

	fmt.Println("keys m:", MapKeys(m))

	_ = MapKeys[int, int](m)

	lst := List[int]{}
	lst.Push(10)
	lst.Push(20)
	lst.Push(30)

	fmt.Println("List values:", lst.GetAll())
}
```

在上述代码中，我们定义了一个泛型函数`MapKeys`，它接受一个类型为`map[k]v`的参数，并返回一个包含所有键的切片。我们还定义了一个泛型结构体`List[T]`，它表示一个链表，可以存储任意类型的数据。通过使用泛型，我们可以编写更加灵活和可重用的代码，而不需要重复编写相似的函数和数据结构。

# 总结
Golang结构体是Go语言中的一种复合数据类型，用于将多个相关的字段组合在一起。结构体可以包含不同类型的字段，并且可以定义方法来操作这些字段，使得代码更加模块化和易于维护。Go语言中的结构体还支持接口、嵌入和泛型等特性，使得代码更加灵活和可扩展。通过理解和使用Golang结构体，我们可以编写更加高效和可维护的Go代码。
