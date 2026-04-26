---
title: Golang 测试介绍
published: 2026-03-22
date: 2026-03-22
pinned: false
description: Golang中的测试方法和技巧。
tags: [Golang, 基础知识]  
category: Golang
draft: false
permalink: golang-test
---

Golang中的测试是Go语言中非常重要的部分。Go语言提供了丰富的测试函数和方法，使得开发者能够方便地编写和运行测试代码。本文将介绍Golang中的测试方法和技巧，帮助初学者理解和使用这些方法。

# 单元测试
单元测试是指对程序中的最小可测试单元进行验证的过程。在Go语言中，我们可以使用`testing`包来编写单元测试。下面是一个简单的示例：

```go
package main

import (
	"fmt"
	"testing"
)

func IntMin(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func TestIntMinBasic(t *testing.T) {
	ans := IntMin(2, 3)
	if ans != 2 {
		t.Errorf("IntMin(2, 3) = %d; want 2", ans)
	}
}
```

在上面的示例中，我们定义了一个函数`IntMin`，它返回两个整数中的较小值。我们还定义了一个测试函数`TestIntMinBasic`，它使用`testing.T`类型的参数来进行测试。在测试函数中，我们调用`IntMin`函数并检查返回值是否正确。如果返回值不正确，我们使用`t.Errorf`方法来报告错误。

## 表驱动的测试
表驱动的测试是一种常见的测试方法，它使用一个表格来定义多个测试用例。每个测试用例包含输入和预期输出。下面是一个表驱动测试的示例：

```go
func TestIntMinTableDriven(t *testing.T) {
	var tests = []struct {
		a, b int
		want int
	}{
		{0, 1, 0},
		{1, 0, 0},
		{-1, 1, -1},
		{1, -1, -1},
		{-1, -2, -2},
		{-2, -1, -2},
	}

	for _, tt := range tests {
		testname := fmt.Sprintf("%d,%d", tt.a, tt.b)
		t.Run(testname, func(t *testing.T) {
			ans := IntMin(tt.a, tt.b)
			if ans != tt.want {
				t.Errorf("IntMin(%d, %d) = %d; want %d", tt.a, tt.b, ans, tt.want)
			}
		})
	}
}
```

在上面的示例中，我们定义了一个测试函数`TestIntMinTableDriven`，它使用一个结构体数组来定义多个测试用例。每个测试用例包含两个输入整数和预期的输出值。在测试函数中，我们使用`for`循环来遍历测试用例，并使用`t.Run`方法来运行每个测试用例。这样可以更清晰地组织和管理测试代码。

# 基准测试
基准测试是指对程序的性能进行评估的过程。在Go语言中，我们可以使用`testing`包中的`B`类型来编写基准测试。下面是一个简单的示例：

```go
func BenchmarkIntMin(b *testing.B) {
    for i := 0; i < b.N; i++ {
        IntMin(2, 3)
    }
}
```

在上面的示例中，我们定义了一个基准测试函数`BenchmarkIntMin`，它使用`testing.B`类型的参数来进行基准测试。在基准测试函数中，我们使用一个循环来调用`IntMin`函数多次，以评估其性能。运行基准测试时，Go语言会自动调整循环的次数，以获得准确的性能数据。