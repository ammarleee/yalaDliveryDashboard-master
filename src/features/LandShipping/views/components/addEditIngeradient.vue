<template>
  <div>
    <v-card class="pa-5">
      <v-btn icon @click="$emit('closeDilogIngeradient')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <h2 class="text-center font-weight-bold mb-5">
        {{ ingeradient._id ? "تعديل المكون" : "إضافة مكون" }}
      </h2>
      <v-form v-model="valid" @submit.prevent="addEditIngeradient">
        <v-row>
          <v-col cols="12" sm="12">
            <v-text-field
              v-model="ingeradient.name"
              :rules="[allRules.required, allRules.minNameLen(4)]"
              dense
              outlined
              label="اسم المكون"
              type="text"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12">
            <v-text-field
              v-model="ingeradient.description"
              :rules="[allRules.required, allRules.minNameLen(10)]"
              dense
              outlined
              label="وصف المكون"
              type="text"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12">
            <div
              v-if="ingeradient.img"
              class="d-flex justify-content-center align-items-center flex-column"
            >
              <div class="mb-2">
                <v-icon button @click="openuploadImg">mdi-camera</v-icon>
              </div>
              <div>
                <img width="100px" height="100px" :src="ingeradient.img" />
              </div>
            </div>
            <v-text-field
              v-else
              @click="openuploadImg"
              outlined
              dense
              placeholder="صورة المكون"
              readonly
            ></v-text-field>
            <input
              class="d-none"
              ref="uploadImg"
              type="file"
              :rules="[allRules.required]"
              @change="uploadFile"
              single
            />
          </v-col>
        </v-row>
        <v-row justify="center" aling="center">
          <v-col cols="12" md="8" class="d-flex justify-center">
            <v-btn
              class="font-weight-bold"
              type="submit"
              color="primary"
              :disabled="!valid"
              :loading="loading"
              >{{ ingeradient._id ? "حفظ تعديلات الصنف" : "تسجيل الصنف" }}</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import ingeradientApi from "../../services/ingeradientApi";
export default {
  props: ["ingeradient", "ingeradients"],
  data() {
    return {
      valid: false,
      loading: false,
      images: null
    };
  },
  methods: {
    async addEditIngeradient() {
      console.log({ imgs: this.images });
      const formData = new FormData();
      formData.append("name", this.ingeradient.name);
      formData.append("description", this.ingeradient.description);
      if (this.ingeradient._id) {
        console.log(this.ingeradient._id);
        formData.append("_id", this.ingeradient._id);
        try {
          if (this.images) {
            formData.append("files", this.images[0]);
          }

          this.loading = true;
          const res = await ingeradientApi.editIngeradient(formData);
          console.log(res);
          this.loading = false;
          this.$emit("closeDilogIngeradient");
          this.EditArr(res.data.Ingredient, this.ingeradients);
          this.ToasteSuccessMsg("تم تعديل بيانات المكون بنجاح");
        } catch (err) {
          console.log(err);
          this.loading = false;
          this.toastErrorMsg(
            error.response.data.msgs.ar ||
              error.response.data.errors.msgs.ar ||
              "حدث خطأ اثناء تعديل المكون"
          );
        }
      } else {
        try {
          formData.append("files", this.images[0]);
          console.log(this.ingeradient);
          console.log(this.images);
          this.loading = true;
          const res = await ingeradientApi.createIngeradient(formData);
          console.log(res.data.Ingredient);
          this.loading = false;
          this.$emit("closeDilogIngeradient");
          this.AddToArr(res.data.Ingredient, this.ingeradients);
          this.ToasteSuccessMsg("تم إضافة مكون بنجاح");
          console.log(res);
        } catch (error) {
          console.log(error);
          this.loading = false;
          this.toastErrorMsg(
            error.response.data.msgs.ar ||
              error.response.data.errors.msgs.ar ||
              "حدث خطأ اثناء إضافة المكون"
          );
        }
      }
    },
    openuploadImg() {
      this.$refs.uploadImg.click();
    },
    uploadFile(e) {
      this.images = e.target.files;
    }
  }
};
</script>

<style lang="scss" scoped></style>
