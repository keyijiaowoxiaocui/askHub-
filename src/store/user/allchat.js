import { defineStore } from "pinia"
import { getAllChat } from "@/api/chat";
const useallChatStore = defineStore('allChat', {
  state: () => {
    return {
      chatLists: []
    }
  },
  actions: {
    getAllList() {
      getAllChat(123456)
        .then((res) => {
          console.log('nihao');
          this.chatLists = res.data.data;
          console.log(this.chatLists, 'hihihii');
        })
        .catch((res) => {
          console.log(res);
        });
    }
  }
})
export default useallChatStore;