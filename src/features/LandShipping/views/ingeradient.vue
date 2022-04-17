<template>
  <div>
    <template>
      <div class="d-flex justify-content-right mt-10 mb-5">
        <AddBtn
          :content="'اضافة مكونات'"
          @submit="(AddEditIngeradient = true), (ingeradient = {})"
        ></AddBtn>
      </div>
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="بحث"
            single-line
            :loading="loadingMainData"
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headersingeradient" :items="ingeradients" :search="search">
          <template v-slot:[`item.img`]="{ item }">
            <img width="100px" height="100px" :src="item.img" class="pa-2" />
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon class="ml-2" color="success" medium @click="editIngeradient(item)"
              >mdi-pen</v-icon
            >
            <v-icon color="error" medium @click="showDeleteCategory(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
        <v-dialog width="500" v-model="AddEditIngeradient" persistent>
          <addEditIngeradient
            @closeDilogIngeradient="AddEditIngeradient = false"
            :ingeradient="ingeradient"
            :ingeradients="ingeradients"
            @pushInIngeradient="AddToArr($event, ingeradients)"
            @EditIngeradient="EditArr($event, ingeradients)"
          ></addEditIngeradient>
        </v-dialog>
        <v-dialog v-model="openDeleteIngeradient" width="500">
          <deleteItemsConfirmMsg
            :loading="loading"
            @submit="sureDeleteIngeradient"
            @closeDeleteDilog="openDeleteIngeradient = false"
            content="المكون"
          ></deleteItemsConfirmMsg>
        </v-dialog>
      </v-card>
    </template>
  </div>
</template>

<script>
import ingeradientApi from "../services/ingeradientApi";
import addEditIngeradient from "./components/addEditIngeradient.vue";
export default {
  components: {
    addEditIngeradient
  },
  data() {
    return {
      headersingeradient: [
        {
          text: "الاسم",
          align: "center",
          value: "name"
        },
        {
          text: "الوصف",
          align: "center",
          value: "description"
        },
        {
          text: "الصورة",
          align: "center",
          value: "img"
        },
        {
          text: "تعديل او حذف",
          align: "center",
          value: "actions"
        }
      ],
      search: "",
      loading: false,
      AddEditIngeradient: false,
      ingeradients: [],
      ingeradient: {},
      deletedIngeradientId: null,
      openDeleteIngeradient: false
    };
  },
  methods: {
    editIngeradient(item) {
      this.AddEditIngeradient = true;
      this.ingeradient = { ...item };
    },
    showDeleteCategory(item) {
      this.openDeleteIngeradient = true;
      this.deletedIngeradientId = item._id;
    },
    async sureDeleteIngeradient() {
      try {
        this.loading = true;
        const res = await ingeradientApi.deleteIngeradient(this.deletedIngeradientId);
        console.log(res);
        this.loading = false;
        this.openDeleteIngeradient = false;
        this.DeleteObjFromArr(this.ingeradients, this.deletedIngeradientId);
        this.ToasteSuccessMsg("تم مسح الصنف بنجاح");
      } catch (error) {
        console.log(error);
        this.loading = false;
        this.toastErrorMsg(
          error.response.data.msgs.ar ||
            error.response.data.errors.msgs.ar ||
            "حدث خطأ اثناء مسح الصنف"
        );
      }
    }
  },
  async mounted() {
    try {
      this.loadingMainData = true;
      const res = await ingeradientApi.getIngeradient();
      console.log(res);
      this.ingeradients = res.data.ingredients;
      this.loadingMainData = false;
    } catch (err) {
      this.loadingMainData = false;
      console.log(err);
    }
  }
};
</script>
<style lang="scss" scoped></style>
