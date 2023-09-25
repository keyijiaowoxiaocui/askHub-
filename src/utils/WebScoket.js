class WebSocketClass {
  constructor(wsurl, time) {
    this.wsurl = wsurl //连接地址
    this.token = localStorage.getItem("accessToken")
    this.time = time //多少秒执行检测
    this.socketTask = null
    this.is_open_socket = false //避免重复连接
    this.heartbeatInterval = null //检测服务器端是否还活着
    this.reconnectTimeOut = null //重连之后多久再次重连

    this.connectSocketInit()
  }
  // 建立初始连接
  connectSocketInit() {

    this.socketTask = new WebSocket(this.wsurl)
    // 当连接成功时
    this.socketTask.onopen = (res) => {
      console.log("websocket连接成功！", res);
      this.is_open_socket = true
      //连接正常清除重连定时器
      this.clearReconnect();
      this.startHeartbeat();
    }
    // 当收到消息时
    this.socketTask.onmessage = (res) => {
      console.log(res.data)
    }
    // 当连接出错时
    this.socketTask.onerror = (res) => {
      console.log("websocket连接出错！", res);
      this.is_open_socket = false
      this.reconnect()
    }
    // 当连接关闭时
    this.socketTask.onclose = (res) => {
      console.log("websocket已经被关闭了！", res);
      this.is_open_socket = false
      this.reconnect()
    }
  }
  // 发送消息
  send(value) {
    console.log(value, this.is_open_socket);
    if (this.is_open_socket) {
      this.socketTask.send(value);
      console.log("消息发送成功！", value);
    } else {
      console.log("无法发送消息：WebSocket未连接");
    }
  }
  // 开启心跳检测
  startHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      const heartbeatMessage = {
        value: "测试一下服务器端是否在连接状态",
        method: "开启心跳机制"
      };
      this.send(JSON.stringify(heartbeatMessage)) // 发送心跳消息
    }, this.time * 1000)
  }
  //停止发送心跳
  stopHeartbeat() {
    clearInterval(this.heartbeatInterval);
  }
  // 清除重连定时器
  clearReconnect() {
    clearTimeout(this.reconnectTimeout);
  }
  // 重新连接
  reconnect() {
    //停止发送心跳
    this.stopHeartbeat()
    //如果不是人为关闭的话，进行重连
    if (!this.is_open_socket) {
      this.reconnectTimeOut = setTimeout(() => {
        this.connectSocketInit();
      }, 3000)
    }
  }
  //外部获取消息
  getMessage(callback) {
    console.log('回调');
    this.socketTask.onmessage = (res) => {
      console.log(res);
      return callback(res) // 调用外部回调函数处理消息
    }
  }
}

export default WebSocketClass;
