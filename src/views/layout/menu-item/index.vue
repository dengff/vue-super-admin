<script lang="jsx">
import {onMounted, defineComponent, ref, h, resolveComponent} from 'vue';

export default defineComponent({
  name: 'MenuItem',
  props: {
    menList: {
      type: Array,
      default: () => {
      },
    },
  },
  components: {},
  setup: function(props, ctx) {
    onMounted(() => {
    });
    const renderMenuItem = (subItem) =>
        <el-menu-item
            index={subItem.path}
            v-slots={{
              title: () => subItem.isLink ?
                  <a className="href" href={subItem.isLink} target="_blank">{subItem.title}</a> :
                  <span>{subItem.title}</span>,

            }}>
          <el-icon>
            {
              h(resolveComponent(subItem.icon))
            }
          </el-icon>
        </el-menu-item>;
    const renderSubMenu = (menList) =>
        menList.map(subItem =>
            <>
              {subItem.children && subItem.children.length ?
                  <el-sub-menu
                      index={subItem.path}
                      v-slots={{
                        title: () =>
                            <>
                              <el-icon>
                                {
                                  h(resolveComponent(subItem.icon))
                                }
                              </el-icon>
                              <span class="test">{subItem.title}</span>
                            </>,
                      }}
                  >
                    {
                      subItem.children.map(item => renderMenuItem(item))
                    }
                  </el-sub-menu>
                  : renderMenuItem(subItem)
              }
            </>,
        );
    return () => renderSubMenu(props.menList);
  },

});
</script>

