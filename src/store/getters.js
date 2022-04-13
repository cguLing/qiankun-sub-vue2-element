// import { models } from '@/settings';

const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,

  // [models.projects]: (state) => state[models.projects],

}
export default getters
