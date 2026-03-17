---
title: Golang 文件处理
published: 2026-03-17
date: 2026-03-17
pinned: false
description: Golang中的文件处理方法和技巧。
tags: [Golang, 基础知识]
category: Golang
draft: false
permalink: golang-file
---

Golang中的文件处理是Go语言中非常重要的部分。Go语言提供了丰富的文件处理函数和方法，使得开发者能够方便地操作文件数据。本文将介绍Golang中的文件处理方法和技巧，帮助初学者理解和使用这些方法。

# 文件基本操作
## 读文件
Go语言中，我们可以使用`os`包来进行处理文件数据。例如，`ReadFile`函数可以一次性读取整个文件内容，`Open`函数可以打开一个文件并返回一个文件对象。下面是一些示例：

```go
package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {
	dat, err := os.ReadFile("../dat.txt")
	check(err)
	fmt.Print(string(dat))

	f, err := os.Open("../dat.txt")
	check(err)

    // 读取文件内容
	b1 := make([]byte, 5)
	n1, err := f.Read(b1)
	check(err)
	fmt.Printf("%d bytes: %s\n", n1, string(b1[:n1]))

    // 使用Seek函数移动文件指针
	o2, err := f.Seek(6, 0)
	check(err)
	b2 := make([]byte, 2)
	n2, err := f.Read(b2)
	check(err)
	fmt.Printf("%d bytes @ %d: %v\n", n2, o2, string(b2[:n2]))

    // 使用ReadAtLeast函数读取指定字节数
	o3, err := f.Seek(6, 0)
	check(err)
	b3 := make([]byte, 2)
	n3, err := io.ReadAtLeast(f, b3, 2)
	check(err)
	fmt.Printf("%d bytes @ %d: %s\n", n3, o3, string(b3))

	_, err = f.Seek(0, 0)
	check(err)

    // 使用bufio包读取文件内容
	r4 := bufio.NewReader(f)
	b4, err := r4.Peek(5)
	check(err)
	fmt.Printf("5 bytes: %s\n", string(b4))

	f.Close()
}
```

在上面的代码中，我们使用了`os`包中的各种函数来处理文件数据。这些函数提供了丰富的功能，使得我们能够方便地进行文件操作。

:::caution
>`Read()`函数返回的是一个内部缓冲区的拷贝而不是文件内容的引用，因此修改返回的字节切片不会改变文件内容。
>
>`Peek()`函数返回的是一个内部缓冲区的引用，因此修改返回的字节切片会改变文件内容。
:::

## 写文件
在Go语言中，我们可以使用`os`包中的`WriteFile`函数来一次性写入整个文件内容，或者使用`OpenFile`函数打开一个文件并返回一个文件对象来进行写操作。下面是一些示例：

```go
package main

import (
	"bufio"
	"fmt"
	"os"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {

    // 使用WriteFile函数直接写入文件内容0
	d1 := []byte("hello\ngo\n")
	err := os.WriteFile("../dat1", d1, 0644)
	check(err)

	f, err := os.Create("../dat2")
	check(err)

	defer f.Close()

    // 使用Write函数写入文件内容，需要先打开文件并获取文件对象
	d2 := []byte{115, 111, 109, 101, 10}
	fmt.Println(string(d2))
	n2, err := f.Write(d2)
	check(err)
	fmt.Printf("wrote %d bytes\n", n2)

    // 也可以使用WriteString函数写入字符串内容
	n3, err := f.WriteString("writes\n")
	check(err)
	fmt.Printf("wrote %d bytes\n", n3)

    // 使用Sync函数将文件内容刷新到磁盘
	f.Sync()

    // 使用bufio包写入文件内容
	w := bufio.NewWriter(f)
	n4, err := w.WriteString("buffered\n")
	check(err)
	fmt.Printf("wrote %d bytes\n", n4)

    // 使用Flush函数将缓冲区内容写入文件
	w.Flush()

}
```

在上述代码中，我们使用了三种不同的方式写入文件内容：一种是直接使用`WriteFile`函数，另一种是先打开文件获取文件对象，然后使用`Write`或`WriteString`函数写入内容。我们还使用了`Sync`函数将文件内容刷新到磁盘，以及使用`bufio`包来进行缓冲写入。

:::note
在上述代码中，我们使用了`f.Sync()`和`w.Flush()`函数来确保文件内容被正确地写入磁盘。`f.Sync()`函数会将文件内容刷新到磁盘，而`w.Flush()`函数会将缓冲区中的内容写入文件。这些函数对于确保数据的持久性非常重要。
:::

## 行过滤器
在Go语言中，我们可以使用`bufio`包中的`Scanner`类型来实现行过滤器。`Scanner`类型提供了一个方便的接口来读取文件中的每一行，并且可以使用自定义的函数来过滤行内容。下面是一个示例：

```go
package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)

	// 使用Scanner类型来读取标准输入中的每一行，并将其转换为大写字母
	for scanner.Scan() {
		ucl := strings.ToUpper(scanner.Text())
		fmt.Println(ucl)
	}

	// 检查扫描过程中是否发生了错误
	if err := scanner.Err(); err != nil {
		fmt.Fprintln(os.Stderr, "reading standard input:", err)
		os.Exit(1)
	}
}
```

在上述代码中，我们创建了一个`Scanner`对象来读取标准输入中的每一行。我们使用`strings.ToUpper`函数将每一行转换为大写字母，并将结果打印出来。最后，我们检查扫描过程中是否发生了错误，并在发生错误时输出错误信息。

## 文件路径
在Go语言中，我们可以使用`path/filepath`包来处理文件路径。这个包提供了许多函数来操作文件路径，可以提供方便的跨操作系统的路径处理功能。下面是一些示例：

```go
package main

import (
	"fmt"
	"path/filepath"
	"strings"
)

func main() {
	p := filepath.Join("dir1", "dir2", "filename")
	fmt.Println(p)

	// 使用Join构建文件路径
	fmt.Println(filepath.Join("dir1//", "filename"))
	fmt.Println(filepath.Join("dir1/../dir1", "filename"))

	// 使用Dir和Base函数获取文件路径的目录和文件名部分
	fmt.Println("Dir(p)", filepath.Dir(p))
	fmt.Println("Base(p)", filepath.Base(p))
	fmt.Println(filepath.Split(p))

	// 使用IsAbs函数判断路径是否为绝对路径
	fmt.Println(filepath.IsAbs("dir/file"))
	fmt.Println(filepath.IsAbs("/dir/file"))

	// 使用Ext函数获取文件扩展名，并使用TrimSuffix函数去掉扩展名
	filename := "config.json"
	ext := filepath.Ext(filename)

	fmt.Println(strings.TrimSuffix(filename, ext))

	// 使用Rel函数计算相对路径
	rel, err := filepath.Rel("a/b", "a/b/t/file")
	if err != nil {
		panic(err)
	}
	fmt.Println(rel)

	rel, err = filepath.Rel("a/b", "a/b/../b/t/file")
	if err != nil {
		panic(err)
	}
	fmt.Println(rel)
}
```

在上述代码中，我们使用了`filepath.Join`函数来构建文件路径，使用`Dir`和`Base`函数来获取文件路径的目录和文件名部分，使用`IsAbs`函数来判断路径是否为绝对路径，使用`Ext`函数来获取文件扩展名，并使用`Rel`函数来计算相对路径。这些函数提供了丰富的功能，使得我们能够方便地处理文件路径。

:::note
`Filepath.Join`函数会根据操作系统的路径分隔符来构建文件路径，所以我们总应该使用这个函数来构建文件路径，而不是直接使用字符串拼接。同时，`Filepath.Join`函数会自动处理路径中的多余分隔符和相对路径，使得我们能够得到一个规范化的文件路径。
:::

## 目录
在Go语言中，我们可以使用`os`包中的函数来处理目录。我们可以使用`Mkdir`函数来创建一个目录，使用`MkdirAll`函数来创建一个目录及其父目录，使用`Remove`函数来删除一个目录，使用`RemoveAll`函数来删除一个目录及其子目录。下面是一些示例：

```go
package main

import (
	"fmt"
	"os"
	"path/filepath"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {

	// 使用Mkdir函数创建一个目录
	err := os.Mkdir("subdir", 0755)
	check(err)

	// 使用Remove函数删除创建的目录
	defer os.RemoveAll("subdir")

	createEmptyFile := func(name string) {
		d := []byte("")
		check(os.WriteFile(name, d, 0644))
	}

	createEmptyFile("subdir/file1")

	err = os.MkdirAll("subdir/parent/child", 0755)
	check(err)

	createEmptyFile("subdir/parent/file2")
	createEmptyFile("subdir/parent/file3")
	createEmptyFile("subdir/parent/child/file4")

	// 使用ReadDir函数列出目录中的文件和子目录
	c, err := os.ReadDir("subdir/parent")
	check(err)

	fmt.Println("Listing subdir/parent")
	for _, entry := range c {
		fmt.Println(" ", entry.Name(), entry.IsDir())
	}

	// 使用Chdir函数切换当前工作目录
	err = os.Chdir("subdir/parent/child")
	check(err)

	// 使用ReadDir函数列出当前目录中的文件和子目录
	c, err = os.ReadDir(".")
	check(err)

	// 列出当前目录中的文件和子目录
	fmt.Println("Listing subdir/parent/child")
	for _, entry := range c {
		fmt.Println(" ", entry.Name(), entry.IsDir())
	}

	// 使用Walk函数递归地访问目录中的所有文件和子目录
	err = os.Chdir("../../..")
	check(err)

	// 使用Walk函数递归地访问目录中的所有文件和子目录
	fmt.Println("Visiting subdir")
	err = filepath.Walk("subdir", visit)
}

func visit(p string, info os.FileInfo, err error) error {
	if err != nil {
		return err
	}
	fmt.Println(" ", p, info.IsDir())
	return nil
}
```

在上述代码中，我们使用了`Mkdir`函数来创建一个目录，使用`RemoveAll`函数来删除一个目录及其子目录，使用`ReadDir`函数来列出目录中的文件和子目录，使用`Chdir`函数来切换当前工作目录，以及使用`Walk`函数来递归地访问目录中的所有文件和子目录。这些函数提供了丰富的功能，使得我们能够方便地处理目录。

## 临时文件和目录
在Go语言中，我们可以使用`os`包中的函数来创建临时文件和目录。我们可以使用`CreateTemp`函数来创建一个临时文件，使用`MkdirTemp`函数来创建一个临时目录。下面是一些示例：

```go
package main

import (
	"fmt"
	"os"
	"path/filepath"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {

	f, err := os.CreateTemp("", "sample")
	check(err)

	// 输出临时文件的名称，一般是在系统的临时目录下创建一个以指定名称为前缀的临时文件
	fmt.Println("Temp file name:", f.Name())

	defer os.Remove(f.Name())

	_, err = f.Write([]byte{1, 2, 3, 4})
	check(err)

	// 使用MkdirTemp函数创建一个临时目录，并输出临时目录的名称
	dname, err := os.MkdirTemp("", "sampledir")
	fmt.Println("Temp dir name:", dname)

	defer os.RemoveAll(dname)

	// 在临时目录中创建一个文件，并写入一些内容
	fname := filepath.Join(dname, "file1")
	err = os.WriteFile(fname, []byte{1, 2}, 0666)
	check(err)
}
```

在上述代码中，我们使用了`CreateTemp`函数来创建一个临时文件，并使用`MkdirTemp`函数来创建一个临时目录。我们还使用了`Remove`函数来删除临时文件，使用`RemoveAll`函数来删除临时目录及其内容。这些函数提供了方便的方式来处理临时文件和目录。