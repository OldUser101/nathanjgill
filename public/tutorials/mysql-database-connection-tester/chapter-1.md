This tutorial will teach you how to create a VB.NET application to test the connection of MySQL databases.

You need to install `MySql.Data` from NuGet or if you are using the PM:
```
PM> Install MySql.Data
```


You will need to create two forms called `Form1` and `Form2`.

On `Form1`, you will need to create the following components:

|Type|Name|
|----|----|
|`Button`|`connect`|
|`Button`|`disconnect`|
|`Label`|`status`|
|`TextBox`|`host`|
|`TextBox`|`user`|
|`TextBox`|`database`|
|`Button`|`options`|
|`TextBox`|`password`|

When done, `Form1` should look like this:

![Completed `Form1`](/resources/mysql-database-connection-tester/form1Done.png)

On `Form2`, you will need to create the following components:

|Type|Name|
|----|----|
|`Button`|`Button1`|
|`Button`|`Button2`|
|`CheckBox`|`resetOnFail`|
|`CheckBox`|`readOnlyData`|
|`CheckBox`|`resetOnDisconnect`|
|`CheckBox`|`usePasswordChar`|
|`TextBox`|`passwordChar`|
|`Label`|`Label1`|
|`PictureBox`|`PictureBox1`|

When done, `Form2` should look like this:

![Completed `Form2`](/resources/mysql-database-connection-tester/Form2Done.png)