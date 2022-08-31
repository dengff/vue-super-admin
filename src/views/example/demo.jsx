import {defineComponent, ref, onMounted, onBeforeMount} from 'vue';
import API from '../../common/service/api';

export default defineComponent(
  {
    name: 'demo',
    setup() {
      let menList = ref([]);
      onBeforeMount(async () => {
        const res = await API.GET_GEEKER_MENU_LIST();
        const mockList = [...Array(6)].map(item => {
          return {
            ...res.data[3],
          };
        });
        menList.value = [...res.data, ...mockList];
        console.log(menList.value, 'value');
      });
      console.log(menList, 'value');
      // return {
      //   menLists
      // }

      return () =>
        <el-row>
          {menList.value.map(item =>
            <el-button style={{paddingBottom: '8px'}}>{item.title}</el-button>)
          }
          {/*<span>test</span>*/}

        </el-row>;
    },

  });
/*import {defineComponent} from 'vue';

export default defineComponent({
  name:'demo',
  render(){
    return <div>
      ceshishuju
    </div>
  }
})*/
/*export const demo = _=><div>{[1,2,5].map(item=>

<span>
  {item}
</span>)



}</div>*/


