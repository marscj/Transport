<template>
  <div
    :class="[{'stripe': stripe, 'hoverFlat': hoverFlat}, `vs-table-${color}`]"
    class="vs-component vs-con-table"
  >
    <!-- header -->
    <header class="header-table vs-table--header">
      <slot name="header"></slot>
      <div v-if="search" class="con-input-search vs-table--search">
        <input v-model="searchx" class="input-search vs-table--search-input" type="text" />
        <vs-icon icon="search"></vs-icon>
      </div>
    </header>
    <div class="con-tablex vs-table--content">
      <div :style="styleConTbody" class="vs-con-tbody vs-table--tbody">
        <table ref="table" class="vs-table vs-table--tbody-table">
          <thead ref="thead" class="vs-table--thead">
            <tr>
              <th v-if="multiple || hasExpadableData" class="td-check">
                <span v-if="multiple" class="con-td-check">
                  <vs-checkbox
                    :key="isCheckedLine ? 'remove' : 'check'"
                    :icon="isCheckedLine ? 'remove' : 'check'"
                    :checked="isCheckedMultiple"
                    size="small"
                    @click="changeCheckedMultiple"
                  />
                </span>
              </th>
              <slot name="thead"></slot>
            </tr>
          </thead>
          <slot :data="datax"></slot>
        </table>
      </div>
      <div v-if="isNoData" class="not-data-table vs-table--not-data">{{ noDataText }}</div>

      <div v-if="pagination" class="con-pagination-table vs-table--pagination">
        <vs-pagination
          :total="getTotalPages"
          :maxItems="page_size"
          :description="description"
          :descriptionItems="descriptionItems"
          v-model="page"
        ></vs-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VxTable",
  props: {
    value: {},
    color: {
      default: "primary",
      type: String
    },
    noDataText: {
      default: "No data Available",
      type: String
    },
    stripe: {
      default: false,
      type: Boolean
    },
    hoverFlat: {
      default: true,
      type: Boolean
    },
    maxHeight: {
      default: "auto",
      type: String
    },
    multiple: {
      default: false,
      type: Boolean
    },
    data: {
      type: Function,
      required: true
    },
    notSpacer: {
      default: false,
      type: Boolean
    },
    search: {
      default: false,
      type: Boolean
    },
    description: {
      default: false,
      type: Boolean
    },
    descriptionItems: {
      default: () => [],
      type: Array
    },
    pagination: {
      default: false,
      type: Boolean
    },
    page_size: {
      default: undefined,
      type: Number
    }
  },
  data: () => ({
    headerWidth: "100%",
    trs: [],
    datax: [],
    searchx: null,
    hasExpadableData: false,
    currentSortKey: null,
    currentSortType: null,
    total: 1,
    page: 1
  }),
  computed: {
    getTotalPages() {
      this.getThs;
      return Math.ceil(this.total / this.page_size);
    },
    isNoData() {
      if (typeof this.datax == Object) {
        return this.datax
          ? Object.keys(this.datax).length == 0
          : false && this.search;
      } else {
        return this.datax ? this.datax.length == 0 : false && this.search;
      }
    },
    isCheckedLine() {
      let lengthx = this.data.length;
      let lengthSelected = this.value.length;
      return lengthx !== lengthSelected;
    },
    isCheckedMultiple() {
      return this.value.length > 0;
    },
    styleConTbody() {
      return {
        maxHeight: this.maxHeight,
        overflow: this.maxHeight != "auto" ? "auto" : null
      };
    },
    getThs() {
      let ths = this.$slots.thead.filter(item => item.tag);
      return ths.length;
    },
    tableHeaderStyle() {
      return {
        width: this.headerWidth
      };
    }
  },
  watch: {
    page() {
      this.loadData();
    },
    page_size() {
      this.page = 1
      this.loadData();
    }
  },
  mounted() {
    window.addEventListener("resize", this.listenerChangeWidth);
    this.maxItemsx = this.maxItems;
    this.loadData();
  },
  destroyed() {
    window.removeEventListener("resize", this.listenerChangeWidth);
  },
  methods: {
    refresh (bool = false) {
      if(bool) {
        this.page = 1
      }
      this.loadData()
    },
    loadData() {
      const parameter = Object.assign({
        page: this.page,
        page_size: this.page_size,
        // ordering:
      });
      const result = this.pagination ? this.data(parameter) : this.data({});
      result.then(res => {
          if(this.pagination) {
            this.datax = res.results;
            this.total = res.count;
          } else {
            this.datax = res;
          }
        })
        .finally(() => {
          this.$nextTick(() => {
            if (this.datax.length > 0) {
              this.changeTdsWidth();
            }
          });
        });
    },
    sort(key, sortType) {
      this.currentSortKey = key;
      this.currentSortType = sortType;
      this.loadData()
    },
    changeCheckedMultiple() {
      let lengthx = this.data.length;
      let lengthSelected = this.value.length;
      let selectedx = lengthx - lengthSelected;
      if (selectedx == 0) {
        this.$emit("input", []);
      } else {
        this.$emit("input", this.data);
      }
    },
    clicktr(tr, isTr) {
      if (this.multiple && isTr) {
        let val = this.value.slice(0);
        if (val.includes(tr)) {
          val.splice(val.indexOf(tr), 1);
        } else {
          val.push(tr);
        }

        this.$emit("input", val);
        this.$emit("selected", tr);
      } else if (isTr) {
        this.$emit("input", tr);
        this.$emit("selected", tr);
      }
    },
    dblclicktr(tr, isTr) {
      if (isTr) {
        this.$emit("dblSelection", tr);
      }
    },
    listenerChangeWidth() {
      this.headerWidth = `${this.$refs.table.offsetWidth}px`;
      this.changeTdsWidth();
    },
    changeTdsWidth() {
      if (!this.value) return;

      let tbody = this.$refs.table.querySelector("tbody");

      // Adding condition removes querySelector none error - if tbody isnot present
      if (tbody) {
        let trvs = tbody.querySelector(".tr-values");
        if (trvs === undefined || trvs === null) return;
        let tds = trvs.querySelectorAll(".td");

        let tdsx = [];

        tds.forEach((td, index) => {
          tdsx.push({ index: index, widthx: td.offsetWidth });
        });

        let colgrouptable = this.$refs.colgrouptable;
        if (colgrouptable !== undefined && colgrouptable !== null) {
          let colsTable = colgrouptable.querySelectorAll(".col");
          colsTable.forEach((col, index) => {
            col.setAttribute("width", tdsx[index].widthx);
          });
        }
      }
    },
    changeMaxItems(index) {
      this.page_size = this.descriptionItems[index];
    }
  }
};
</script>