<template>
  <div>
    <side-bar/>
  </div>
</template>

<script>

import SideBar from '../Components/SideBar.vue'
import * as Constants from '../../common/Constants'

export default {
  name: Constants.COMPONENT_NAME_DASHBOARD,
  
  components: {
    SideBar
  }

};
</script>

<style></style>
