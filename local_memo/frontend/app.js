var app = new Vue({
  el: '#app',
  data() {
    return {
      form: {
        memo: '',
        memo_disabled : true
      },
    }
  },
  mounted :function(){
    axios.get('http://127.0.0.1:5000/read')
        .then(response => {
          console.log(response)
          this.form.memo = response.data.memo;
        })
        .catch(response => {
          console.log(response);
          this.form.memo = "メモロードできません"
        }
      )
  },
  methods : {
    editing: function(event){
      console.log("Start Editing")
      this.form.memo_disabled = false;
    },
    sending: function(event) {
      console.log("Start Sending")
      this.form.memo_disabled = true;

      axios.post('http://127.0.0.1:5000/write',
        {
          message: this.form.memo
        }).then(response => {
          console.log(response)
          this.form.memo = response.data.memo;
          this.form.memo_disabled = true;
        }).catch(response => {
          console.log(response)
          this.form.memo_disabled = true;
        });
    },
  }
})
