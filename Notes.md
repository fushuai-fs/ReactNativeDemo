修改端口号   
\node_modules\react-native\local-cli\server\server.js   
-- \node_modules\react-native\ReactAndroid\src\main\java\com\facebook\react\modules\systeminfo\AndroidInfoHelpers.java

从本地仓库删除文件   
git rm -r --cached xxx.json

  // 注意： 如果route在tabNavigator里就接收不到params参数了    
                navi.dispatch( NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: 'Two', params: { token: 'abcdefg' }})
                    ]
                })

    TextInput
   ``2018-01-13       ``
onSubmitEditing  function 此回调函数当软键盘的 ``确定``/``提交`` 按钮被按下的时候调用此函数。如果``multiline={true}``，此属性不可用。

autoCorrect bool 
如果为false，会关闭拼写自动修正。默认值是true。

blurOnSubmit bool 
如果为true，文本框会在提交的时候失焦。对于单行输入框默认值为true，多行则为false。     
注意：对于多行输入框来说，如果将blurOnSubmit设为true，则在按下回车键时就会失去焦点同时触发onSubmitEditing事件，而不会换行。

caretHidden bool 
如果为true，则隐藏光标。默认值为false

onLayout function 
当组件挂载或者布局变化的时候调用，参数为{x, y, width, height}。

onSelectionChange function 
长按选择文本时，选择范围变化时调用此函数，传回参数的格式形如 { nativeEvent: { selection: { start, end } } }。


returnKeyType enum('done', 'go', 'next', 'search', 'send', 'none', 'previous', 'default', 'emergency-call', 'google', 'join', 'route', 'yahoo')         
决定“确定”按钮显示的内容。      
在Android上你还可以使用returnKeyLabel来自定义文本。    
跨平台     
下列这些选项是跨平台可用的：
done
go
next
search
send    

限``Android``
下列这些选项仅限Android使用：none previous    

限``iOS``
下列这些选项仅限iOS使用：
default
emergency-call
google
join
route
yahoo

secureTextEntry bool 
 如果为true，文本框会遮住之前输入的文字，这样类似密码之类的敏感文字可以更加安全。默认值为false
 
 selectTextOnFocus bool 
 如果为true，当获得焦点的时候，所有的文字都会被选中。
 
 selection {start: number, end: number} 
 设置选中文字的范围（指定首尾的索引值）。如果首尾为同一索引位置，则相当于指定光标的位置。
 
 keyboardType enum("default", 'numeric', 'email-address', "ascii-capable", 'numbers-and-punctuation', 'url', 'number-pad', 'phone-pad', 'name-phone-pad', 'decimal-pad', 'twitter', 'web-search')        
 决定弹出的何种软键盘的，譬如``numeric``（纯数字键盘）。      
 这些值在所有平台都可用： 
 default
 numeric
 email-address
 phone-pad
        
   ``2018-01-13 end``
 
 2018.01.15
 InteractionManager  允许在任何交互/动画完成后安排长时间运行的工作。特别是，这允许JavaScript动画顺利运行。       
 requestAnimationFrame（）：用于动画化视图的代码。        
 setImmediate / setTimeout（）：稍后运行代码，注意这可能会延迟动画。     
 runAfterInteractions（）：稍后运行代码，而不会延迟活动动画。       
 runAfterInteractions  安排一个函数在所有交互完成后运行。      
 
 
 AsyncStorage 异步的、持久化的Key-Value存储系统