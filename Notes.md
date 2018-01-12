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