import {onBeforeMount} from 'vue';
import {GlobalStore} from 'src/store';
import {getLightColor, getDarkColor} from 'src/common/utils/theme/tool';
// 引入问题 _||_ 传入 pinia
/**
 * pinia 错误使用说明示例
 * https://github.com/vuejs/pinia/discussions/971
 * https://github.com/vuejs/pinia/discussions/664#discussioncomment-1329898
 * https://pinia.vuejs.org/core-concepts/outside-component-usage.html#single-page-applications
 */
// const globalStore = GlobalStore();
export const useTheme = () => {
  const {setThemeConfig, themeConfig} = GlobalStore();
  const changePrimary = (colorVal) => {
    if (!colorVal) {
      colorVal = '#409EFF';
    }

    setThemeConfig('primary', colorVal);
    // 修改点击时候的颜色
    document.documentElement.style.setProperty('--el-color-primary-dark-2',
      `${getDarkColor(themeConfig.primary, 0.1)}`);
    // 修改默认的颜色
    document.documentElement.style.setProperty('--el-color-primary',
      themeConfig.primary);
  };

  // 颜色变浅 修改(hover 的颜色信息)
  for (let i = 1; i <= 9; i++) {
    document.documentElement.style.setProperty(
      `--el-color-primary-light-${i}`,
      `${getLightColor(themeConfig.primary, i / 10)}`,
    );
  }
  const switchDark = () => {
    debugger
    const value = themeConfig.isDark ? 'dark' : '';
    document.documentElement.setAttribute('class', value);
  };
  const changeGreyOrWeak = (value, type) => {
    if (!value) return document.body.setAttribute('style', '');
    const map = {
      'grey': () => {
        document.body.setAttribute('style', 'filter:grayscale(1)');
      },
      'weak': () => {
        document.body.setAttribute('style', 'filter:invert(80%)');
      },
    };
    map[type] && map[type]();
    console.log(type, 'type');
    let propsName = type === 'grey' ? 'isWeak' : 'isGrey';
    setThemeConfig(propsName, false);

  };
  onBeforeMount(() => {
    changePrimary(themeConfig.primary);
    if (themeConfig.isGrey) changeGreyOrWeak(true, 'grey');
    if (themeConfig.isWeak) changeGreyOrWeak(true, 'weak');
  });
  return {changePrimary, changeGreyOrWeak, switchDark};

};