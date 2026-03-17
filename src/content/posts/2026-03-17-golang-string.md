---
title: Golang字符串处理
published: 2026-03-17
date: 2026-03-17
pinned: false
description: Golang中的字符串处理方法和技巧。
tags: [Golang, 基础知识]
category: Golang
draft: false
permalink: golang-string
---

Golang中的字符串处理是Go语言中非常重要的部分。Go语言提供了丰富的字符串处理函数和方法，使得开发者能够方便地操作字符串。本文将介绍Golang中的字符串处理方法和技巧，帮助初学者理解和使用这些方法。

# 字符串基本操作
Go语言中，我们可以使用一些内置函数来进行处理字符串。例如，`len`函数可以获取字符串的长度，`strings`包提供了许多函数来操作字符串，如`Contains`、`HasPrefix`、`HasSuffix`等。下面是一些示例：

```go
package main

import (
	"fmt"
	s "strings"
)

var p = fmt.Println

func main() {
	p("Contains: ", s.Contains("test", "es")) // 是否包含子串
	p("Count: ", s.Count("test", "t")) // 统计子串出现的次数
	p("HasPrefix: ", s.HasPrefix("test", "te")) // 是否以指定前缀开头
	p("HasSuffix: ", s.HasSuffix("test", "st")) // 是否以指定后缀结尾
	p("Index: ", s.Index("test", "e")) // 查找子串第一次出现的位置
	p("Join: ", s.Join([]string{"a", "b"}, "-")) // 将字符串切片连接成一个字符串
	p("Repeat: ", s.Repeat("a", 5)) // 重复字符串
	p("Replace: ", s.Replace("foo", "o", "0", -1)) // 替换字符串，-1表示替换所有匹配项
	p("Replace: ", s.Replace("foo", "o", "0", 1)) // 替换字符串，限制替换次数
	p("Split: ", s.Split("a-b-c-d-e", "-")) // 将字符串切割成字符串切片
	p("ToLower: ", s.ToLower("TEST")) // 将字符串转换为小写
	p("ToUpper: ", s.ToUpper("test")) // 将字符串转换为大写
	p("Trim: ", s.Trim(" !!! Achtung !!! ", "! ")) // 去除字符串两端的指定字符
	p()

	p("Len: ", len("hello"))
	p("Char: ", "hello"[1])
}
```

在上面的代码中，我们使用了`strings`包中的各种函数来处理字符串。这些函数提供了丰富的功能，使得我们能够方便地进行字符串操作。

# 字符串格式化
Go在传统的printf中对字符串格式化提供了优异的支持。我们可以使用`fmt`包中的`Sprintf`函数来格式化字符串。下面是一些示例：

```go
package main

import (
	"fmt"
	"os"
)

type point struct {
	x, y int
}

func main() {

	p := point{1, 2}
	fmt.Printf("struct1: %v\n", p)

	fmt.Printf("struct2: %+v\n", p)

	fmt.Printf("struct3: %#v\n", p)

	fmt.Printf("type: %T\n", p)

	fmt.Printf("bool: %t\n", true)

	fmt.Printf("int: %d\n", 123)

	fmt.Printf("bin: %b\n", 14)

	fmt.Printf("char: %c\n", 33)

	fmt.Printf("hex: %x\n", 456)

	fmt.Printf("float1: %f\n", 78.9)

	fmt.Printf("float2: %e\n", 123400000.0)
	fmt.Printf("float3: %E\n", 123400000.0)

	fmt.Printf("str1: %s\n", "\"string\"")

	fmt.Printf("str2: %q\n", "\"string\"")

	fmt.Printf("str3: %x\n", "hex this")

	fmt.Printf("pointer: %p\n", &p)

	fmt.Printf("width1: |%6d|%6d|\n", 12, 345)

	fmt.Printf("width2: |%6.2f|%6.2f|\n", 1.2, 3.45)

	fmt.Printf("width3: |%-6.2f|%-6.2f|\n", 1.2, 3.45)

	fmt.Printf("width4: |%6s|%6s|\n", "foo", "b")

	fmt.Printf("width5: |%-6s|%-6s|\n", "foo", "b")

	s := fmt.Sprintf("sprintf: a %s", "string")
	fmt.Println(s)

	fmt.Fprintf(os.Stderr, "io: an %s\n", "error")
}
```

上述代码展示了Go语言中字符串格式化的各种方式，包括结构体、布尔值、整数、浮点数、字符串等的格式化。通过使用不同的格式化动词，我们可以控制输出的格式和样式。具体的常用格式化动词可以参考下表。

1. Go语言中的通用格式化动词：
   
| 动词 | 说明 |
| --- | --- |
| %v | 默认格式 |
| %+v | 在默认格式的基础上添加字段名 |
| %#v | Go语法表示 |
| %T | 输出值的类型 |
| %t | 布尔值 |
| %d | 十进制整数 |

2. Go语言中的数值格式化动词：

| 动词 | 说明 |
| --- | --- |
| %b | 二进制整数 |
| %c | Unicode字符 |
| %x | 十六进制整数 |
| %X | 十六进制整数（大写） |
| %c | Unicode字符 |
| %u | Unicode字符（无符号） |

3. Go语言中的浮点数格式化动词：

| 动词 | 说明 |
| --- | --- |
| %f | 十进制浮点数 |
| %e | 科学计数法（小写） |
| %E | 科学计数法（大写） |
| %g | 根据实际情况选择%f或%e格式 |
|%.2f | 保留两位小数的十进制浮点数 |

4. Go语言中的字符串格式化动词：
   
| 动词 | 说明 |
| --- | --- |
| %s | 字符串 |
| %q | 双引号包围的字符串，Go语法表示 |
| %x | 十六进制表示的字符串 |

5. Go语言中布尔与指针格式化动词：

| 动词 | 说明 |
| --- | --- |
| %t | 布尔值 |
| %p | 指针地址 |

6. Go语言中的宽度和精度格式化动词：

| 动词 | 说明 |
| --- | --- |
| %6d | 最小宽度为6的十进制整数 |
| %6.2f | 最小宽度为6，保留两位小数的十进制浮点数 |
| %6s | 最小宽度为6的字符串 |
| %-6.2f | 最小宽度为6，保留两位小数，左对齐 |
| %-6s | 最小宽度为6的字符串，左对齐 |
| %06d | 最小宽度为6的十进制整数，前面补零 |

# 文本模板
Go语言中的`text/template`包提供了强大的文本模板功能，可以用于生成动态文本内容。我们可以定义模板，并使用数据来填充模板中的占位符。下面是一个示例：

```go
package main

import (
	"os"
	"text/template"
)

func main() {
	t1 := template.New("t1")
	t1, err := t1.Parse("Value is {{.}}\n") // 解析模板字符串
	if err != nil {
		panic(err)
	}

	t1 = template.Must(t1.Parse("Value: {{.}}\n")) // 可以用must来简化错误处理，如果解析失败会直接引发panic

	t1.Execute(os.Stdout, "some text")
	t1.Execute(os.Stdout, 5)
	t1.Execute(os.Stdout, []string{
		"Go",
		"Python",
		"Java",
	}) // 模板中的占位符可以接受任何类型的数据，包括字符串、整数、切片等

	Create := func(name, t string) *template.Template {
		return template.Must(template.New(name).Parse(t))
	}

	t2 := Create("t2", "Name: {{.Name}}\n") // 可以使用.FieldName来访问结构体的字段

	t2.Execute(os.Stdout, struct {
		Name string
	}{Name: "Alice"})

	t2.Execute(os.Stdout, map[string]string{
		"Name": "Bob",
	})// 也可以使用map来提供数据，模板中的占位符可以通过键名来访问对应的值

	t3 := Create("t3", "{{if . -}} yes {{else -}} no {{end}}\n")
	t3.Execute(os.Stdout, "not empty")
	t3.Execute(os.Stdout, "") // 模板中的条件语句可以根据数据的值来决定输出内容

	t4 := Create("t4", "Range: {{range .}}{{.}} {{end}}\n")
	t4.Execute(os.Stdout, []string{"A", "B", "C"}) // 模板中的range语句可以用于迭代切片、数组等集合类型的数据
}
```

在上面的代码中，我们定义了多个模板，并使用不同类型的数据来填充模板中的占位符。通过使用条件语句和迭代语句，我们可以根据数据的值来控制输出内容。

:::note
>if 模块只要条件不是类型的默认值就会被认为是true，例如非空字符串、非零整数、非空切片等都会被认为是true，而空字符串、零整数、nil切片等会被认为是false。
>
>range 模块会迭代切片、数组、map等集合类型的数据，对于切片和数组，迭代时会将每个元素赋值给占位符；对于map，迭代时会将每个键值对赋值给占位符，同时在range块内`{{.}}`会被设置为当前迭代项。
:::

# 正则表达式
Go语言中的`regexp`包提供了强大的正则表达式功能，可以用于匹配和处理字符串。我们可以使用正则表达式来查找、替换、分割字符串等。下面是一些示例：

```go
package main

import (
	"bytes"
	"fmt"
	"regexp"
)

func main() {

	match, _ := regexp.MatchString("p([a-z]+)ch", "peach")
	fmt.Println(match)

	r, _ := regexp.Compile("p([a-z]+)ch") // 编译正则表达式，可以获得一个效率更高的表达式，如果编译失败会返回错误

	fmt.Println(r.MatchString("peach"))

	fmt.Println(r.FindString("peach punch")) // 查找第一个匹配的字符串

	fmt.Println("idx: ", r.FindStringIndex("peach punch")) // 查找第一个匹配的字符串的位置，返回一个包含开始和结束位置的切片

	fmt.Println(r.FindStringSubmatch("peach punch")) // 查找第一个匹配的字符串和子表达式的匹配结果，返回一个切片，第一个元素是整个匹配的字符串，后续元素是子表达式的匹配结果

	fmt.Println(r.FindAllStringSubmatchIndex("peach punch", -1)) // 查找所有匹配的字符串和子表达式的匹配结果，返回一个切片，每个元素是一个包含整个匹配字符串和子表达式匹配结果位置的切片，-1表示查找所有匹配项

	fmt.Println("all: ", r.FindAllString("peach punch pinch", -1)) // 查找所有匹配的字符串，返回一个切片，-1表示查找所有匹配项

	fmt.Println("all: ", r.FindAllStringSubmatchIndex("peach punch pinch", -1)) // 查找所有匹配的字符串和子表达式的匹配结果，返回一个切片，每个元素是一个包含整个匹配字符串和子表达式匹配结果位置的切片，-1表示查找所有匹配项

	fmt.Println(r.FindAllString("peach punch pinch", 2)) // 查找所有匹配的字符串，返回一个切片，限制返回的匹配项数量为2 

	fmt.Println(r.Match([]byte("peach"))) // 也可以使用字节切片来进行匹配，返回一个布尔值表示是否匹配成功

	r = regexp.MustCompile("p([a-z]+)ch")
	fmt.Println(r) // MustCompile是Compile的简化版本，如果正则表达式无效会直接引发panic，适用于在程序初始化时编译正则表达式

	fmt.Println(r.ReplaceAllString("a peach", "<fruit>")) // 替换字符串中所有匹配的子串，返回替换后的字符串

	in := []byte("a peach")
	out := r.ReplaceAllFunc(in, bytes.ToUpper)// 使用给定的函数来转换匹配的文本
	fmt.Println(string(out))
}
```

在上面的代码中，我们使用了`regexp`包中的各种函数来处理字符串。我们可以使用正则表达式来匹配字符串，查找子串的位置，替换字符串等。通过使用正则表达式，我们可以更灵活地处理字符串。

# 总结
Go语言提供了丰富的字符串处理功能，包括基本操作、格式化、文本模板和正则表达式等。通过使用这些功能，我们可以方便地操作字符串，生成动态文本内容，并进行复杂的字符串匹配和替换。掌握这些字符串处理方法和技巧对于Go语言开发者来说是非常重要的，可以帮助我们更高效地处理字符串相关的任务。




