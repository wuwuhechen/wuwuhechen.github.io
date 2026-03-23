---
title: Golang 命令行操作
published: 2026-03-22
date: 2026-03-22
pinned: false
description: Golang中的命令行操作方法和技巧。
tags: [Golang, 基础知识]
category: Golang
draft: false
permalink: golang-command
---

Golang中的命令行操作是Go语言中非常重要的部分。Go语言提供了丰富的命令行操作函数和方法，使得开发者能够方便地处理命令行参数和输入输出。本文将介绍Golang中的命令行操作方法和技巧，帮助初学者理解和使用这些方法。

# 命令行参数
在Go语言中，我们可以使用`os`包来处理命令行参数。`os.Args`是一个字符串切片，包含了命令行参数。第一个元素是程序的名称，后续元素是传递给程序的参数。下面是一些示例：

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	argsWithProg := os.Args
	argsWithoutProg := os.Args[1:]

	arg := os.Args[3]

	fmt.Println("Args with program:", argsWithProg)
	fmt.Println("Args without program:", argsWithoutProg)
	fmt.Println("Arg 3:", arg)
}
```

在上面的示例中，我们使用`os.Args`来获取命令行参数。我们可以通过索引访问特定的参数，也可以使用切片来获取所有参数。

example:
```
// input
go build command-line-arguments.go
./command-line-arguments one two three four

// Output:
Args with program: [./command-line-arguments one two three four]
Args without program: [one two three four]
Arg 3: three
```

# 命令行标志
Go语言还提供了`flag`包来处理命令行标志。标志是一种特殊的命令行参数，通常以`-`或`--`开头。我们可以使用`flag`包来定义和解析标志。下面是一个示例：

```go
package main

import (
	"flag"
	"fmt"
)

func main() {
	wordPtr := flag.String("word", "foo", "a string")

	numbPtr := flag.Int("numb", 42, "an int")
	boolPtr := flag.Bool("fork", false, "a bool")

	var svar string
	flag.StringVar(&svar, "svar", "bar", "a string var")

	flag.Parse()

	fmt.Println("word:", *wordPtr)
	fmt.Println("numb:", *numbPtr)
	fmt.Println("fork:", *boolPtr)
	fmt.Println("svar:", svar)
	fmt.Println("tail:", flag.Args())
}
```

在上面的示例中，我们使用`flag.String`、`flag.Int`和`flag.Bool`函数来定义了三个标志，分别是`word`、`numb`和`fork`。我们还使用了`flag.StringVar`函数来定义了一个字符串变量`svar`。最后，我们调用了`flag.Parse()`函数来解析命令行标志，并打印出标志的值和剩余的命令行参数。

example:
```
// input
./command-line-arguments -word=opt -numb=7 -fork -svar
// Output:
word: opt
numb: 7
fork: true
svar: bar
tail: []

// input
./command-line-arguments -word=opt
// Output:
word: opt
numb: 42
fork: false
svar: bar
tail: []

// input
./command-line-arguments -word=opt a1 a2 a3
// Output:
word: opt
...
tail: [a1 a2 a3]
```

# 命令行子命令
Go语言还提供了`flag`包来处理命令行子命令。子命令是一种特殊的命令行参数，通常用于表示程序的不同功能或模式。我们可以使用`flag`包来定义和解析子命令。下面是一个示例：

```go
package main

import (
	"flag"
	"fmt"
	"os"
)

func main() {
    // 定义子命令
	fooCmd := flag.NewFlagSet("foo", flag.ExitOnError)
	fooEnable := fooCmd.Bool("enable", false, "enable")
	fooName := fooCmd.String("name", "", "name")

    // 定义另一个子命令
	barCmd := flag.NewFlagSet("bar", flag.ExitOnError)
	barLevel := barCmd.Int("level", 0, "level")

	if len(os.Args) < 2 {
		fmt.Println("expected 'foo' or 'bar' subcommands")
		os.Exit(1)
	}

	switch os.Args[1] {
	case "foo":
		fooCmd.Parse(os.Args[2:])
		fmt.Println("subcommand 'foo'")
		fmt.Println("  enable:", *fooEnable)
		fmt.Println("  name:", *fooName)
		fmt.Println("  tail:", fooCmd.Args())
	case "bar":
		barCmd.Parse(os.Args[2:])
		fmt.Println("subcommand 'bar'")
		fmt.Println("  level:", *barLevel)
		fmt.Println("  tail:", barCmd.Args())
	default:
		fmt.Println("expected 'foo' or 'bar' subcommands")
		os.Exit(1)
	}
}
```

在上面的示例中，我们定义了两个子命令`foo`和`bar`，分别使用`flag.NewFlagSet`函数创建了两个新的标志集。我们还定义了每个子命令的标志，并使用`Parse`方法来解析子命令的标志。最后，我们根据输入的子命令来执行相应的逻辑。

example:
```
// input
./command-line-arguments foo -enable -name=example a1 a2
// Output:
subcommand 'foo'
    enable: true
    name: example
    tail: [a1 a2]

// input
./command-line-arguments bar -level=3 b1 b2
// Output:
subcommand 'bar'
    level: 3
    tail: [b1 b2]
```

# 环境变量
Go语言还提供了`os`包来处理环境变量。我们可以使用`os.Getenv`函数来获取环境变量的值，使用`os.Setenv`函数来设置环境变量的值，使用`os.Unsetenv`函数来删除环境变量。下面是一些示例：

```go
package main

import (
	"fmt"
	"os"
	"strings"
)

func main() {
	os.Setenv("FOO", "1")
	fmt.Println("FOO: ", os.Getenv("FOO"))
	fmt.Println("BAR: ", os.Getenv("BAR"))

	fmt.Println("All environment variables:")
	for _, env := range os.Environ() {
		pair := strings.SplitN(env, "=", 2)
		fmt.Println(pair[0])
	}
}
```

在上面的示例中，我们使用`os.Setenv`函数来设置了一个环境变量`FOO`，并使用`os.Getenv`函数来获取了环境变量的值。我们还使用了`os.Environ`函数来获取所有的环境变量，并打印出它们的名称。