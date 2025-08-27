<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4"
  >
    <!-- Background decorations -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"
      ></div>
    </div>

    <div class="relative max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1
          class="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2"
        >
          Thông tin cá nhân
        </h1>
      </div>

      <!-- Loading state -->
      <div
        v-if="loading"
        class="flex flex-col items-center justify-center py-20"
      >
        <div class="relative">
          <div
            class="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"
          ></div>
          <div
            class="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-indigo-400 rounded-full animate-spin animation-delay-150"
          ></div>
        </div>
        <p class="mt-4 text-gray-600 font-medium">Đang tải thông tin...</p>
      </div>

      <!-- Profile content -->
      <div
        v-else
        class="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
      >
        <!-- Avatar section -->
        <div
          class="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-12 text-center relative overflow-hidden"
        >
          <div class="absolute inset-0 bg-black/5"></div>
          <div class="relative z-10">
            <div class="inline-block relative group">
              <div
                class="w-32 h-32 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl bg-white/10 backdrop-blur-sm mx-auto relative"
              >
                <!-- Current or preview image -->
                <img
                  v-if="imagePreview || userInfo.image?.url"
                  :src="imagePreview || userInfo.image.url"
                  :alt="userInfo.hoTen"
                  class="w-full h-full object-cover"
                />
                <!-- Default avatar when no image -->
                <div
                  v-else
                  class="w-full h-full flex items-center justify-center text-white/70"
                >
                  <svg
                    class="w-16 h-16"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                </div>

                <!-- Edit overlay -->
                <div
                  v-if="isEditing"
                  @click="triggerFileUpload"
                  class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
                >
                  <div class="text-center">
                    <svg
                      class="w-8 h-8 text-white mx-auto mb-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      ></path>
                    </svg>
                    <span class="text-white text-xs">Thay đổi</span>
                  </div>
                </div>

                <!-- Remove image button (when there's a preview) -->
                <button
                  v-if="isEditing && (selectedFile || imagePreview)"
                  @click.stop="clearImageSelection"
                  class="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>

              <!-- Upload button -->
              <div class="mt-4 space-y-2">
                <button
                  v-if="isEditing"
                  @click="triggerFileUpload"
                  class="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm border border-white/20"
                >
                  {{ selectedFile ? "Chọn ảnh khác" : "Thay đổi ảnh đại diện" }}
                </button>

                <!-- Image info -->
                <div v-if="selectedFile" class="text-white/80 text-xs">
                  <p>{{ selectedFile.name }}</p>
                  <p>{{ formatFileSize(selectedFile.size) }}</p>
                </div>
              </div>
            </div>

            <h2 class="text-2xl font-bold text-white mt-4">
              {{ userInfo.hoTen || "Chưa có tên" }}
            </h2>
            <p class="text-blue-100">MSSV: {{ userInfo.mssv }}</p>
          </div>

          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            @change="handleFileSelect"
            class="hidden"
          />
        </div>

        <!-- Form section -->
        <div class="p-8">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Form rows -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- MSSV (disabled) -->
              <div class="space-y-2">
                <label
                  class="text-sm font-semibold text-gray-700 flex items-center"
                >
                  <svg
                    class="w-4 h-4 mr-2 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-4 0V5a2 2 0 014 0"
                    ></path>
                  </svg>
                  MSSV
                </label>
                <input
                  type="text"
                  :value="userInfo.mssv"
                  disabled
                  class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-500 focus:outline-none cursor-not-allowed"
                />
              </div>

              <!-- Họ và tên -->
              <div class="space-y-2">
                <label
                  class="text-sm font-semibold text-gray-700 flex items-center"
                >
                  <svg
                    class="w-4 h-4 mr-2 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                  Họ và tên
                </label>
                <input
                  v-model="formData.hoTen"
                  type="text"
                  :disabled="!isEditing"
                  :class="[
                    'w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none',
                    !isEditing
                      ? 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
                      : errors.hoTen
                      ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200',
                  ]"
                  placeholder="Nhập họ và tên"
                />
                <span
                  v-if="errors.hoTen"
                  class="text-red-500 text-sm flex items-center"
                >
                  <svg
                    class="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  {{ errors.hoTen }}
                </span>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Số điện thoại -->
              <div class="space-y-2">
                <label
                  class="text-sm font-semibold text-gray-700 flex items-center"
                >
                  <svg
                    class="w-4 h-4 mr-2 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                  Số điện thoại
                </label>
                <input
                  v-model="formData.sdt"
                  type="tel"
                  :disabled="!isEditing"
                  :class="[
                    'w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none',
                    !isEditing
                      ? 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
                      : errors.sdt
                      ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200',
                  ]"
                  placeholder="Nhập số điện thoại"
                />
                <span
                  v-if="errors.sdt"
                  class="text-red-500 text-sm flex items-center"
                >
                  <svg
                    class="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  {{ errors.sdt }}
                </span>
              </div>

              <!-- Lớp -->
              <div class="space-y-2">
                <label
                  class="text-sm font-semibold text-gray-700 flex items-center"
                >
                  <svg
                    class="w-4 h-4 mr-2 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    ></path>
                  </svg>
                  Lớp
                </label>
                <input
                  v-model="formData.lop"
                  type="text"
                  disabled
                  class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-500 focus:outline-none cursor-not-allowed"
                  placeholder="Nhập lớp"
                />
                <span
                  v-if="errors.lop"
                  class="text-red-500 text-sm flex items-center"
                >
                  <svg
                    class="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  {{ errors.lop }}
                </span>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Khóa -->
              <div class="space-y-2">
                <label
                  class="text-sm font-semibold text-gray-700 flex items-center"
                >
                  <svg
                    class="w-4 h-4 mr-2 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    ></path>
                  </svg>
                  Khóa
                </label>
                <input
                  v-model.number="formData.khoa"
                  type="number"
                  disabled
                  class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-500 focus:outline-none cursor-not-allowed"
                  placeholder="Nhập khóa"
                  min="1"
                />
                <span
                  v-if="errors.khoa"
                  class="text-red-500 text-sm flex items-center"
                >
                  <svg
                    class="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  {{ errors.khoa }}
                </span>
              </div>

              <!-- Giới tính -->
              <div class="space-y-2">
                <label
                  class="text-sm font-semibold text-gray-700 flex items-center"
                >
                  <svg
                    class="w-4 h-4 mr-2 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    ></path>
                  </svg>
                  Giới tính
                </label>
                <select
                  v-model="formData.gioiTinh"
                  :disabled="!isEditing"
                  :class="[
                    'w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none',
                    !isEditing
                      ? 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
                      : 'border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200',
                  ]"
                >
                  <option value="">Chọn giới tính</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>
            </div>

            <!-- Ngày sinh -->
            <div class="space-y-2">
              <label
                class="text-sm font-semibold text-gray-700 flex items-center"
              >
                <svg
                  class="w-4 h-4 mr-2 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                Ngày sinh
              </label>
              <input
                v-model="formData.ngaySinh"
                type="date"
                :disabled="!isEditing"
                :class="[
                  'w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none md:w-1/2',
                  !isEditing
                    ? 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
                    : errors.ngaySinh
                    ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                    : 'border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200',
                ]"
              />
              <span
                v-if="errors.ngaySinh"
                class="text-red-500 text-sm flex items-center"
              >
                <svg
                  class="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                {{ errors.ngaySinh }}
              </span>
            </div>

            <!-- Action buttons -->
            <div
              class="flex flex-col sm:flex-row gap-4 justify-center pt-8 border-t border-gray-200"
            >
              <div v-if="!isEditing" class="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  @click="startEditing"
                  class="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center"
                >
                  <svg
                    class="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    ></path>
                  </svg>
                  Chỉnh sửa thông tin
                </button>
                <button
                  type="button"
                  @click="showPasswordModal = true"
                  class="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center"
                >
                  <svg
                    class="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    ></path>
                  </svg>
                  Thay đổi mật khẩu
                </button>
              </div>

              <template v-else>
                <button
                  type="button"
                  @click="cancelEditing"
                  class="px-8 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  :disabled="updating"
                >
                  <svg
                    class="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                  Hủy
                </button>
                <button
                  type="submit"
                  class="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  :disabled="updating"
                >
                  <svg
                    v-if="updating"
                    class="animate-spin w-5 h-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <svg
                    v-else
                    class="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  {{ updating ? "Đang cập nhật..." : "Lưu thay đổi" }}
                </button>
              </template>
            </div>
          </form>
        </div>
      </div>

      <!-- Password Change Modal -->
      <div
        v-if="showPasswordModal"
        class="fixed inset-0 bg-black/60 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4"
        @click="showPasswordModal = false"
      >
        <div class="relative w-full max-w-md transform transition-all duration-300 ease-out" @click.stop>
          <div class="absolute rounded-3xl opacity-75"></div>
          <div class="relative backdrop-blur-xl bg-white/95 rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <!-- Modal Header -->
            <div class="flex items-center justify-between p-6 border-b border-gray-200/50 bg-gradient-to-r from-gray-50/90 to-blue-50/90">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 class="text-lg font-bold text-gray-900">Thay đổi mật khẩu</h3>
              </div>
              <button @click="closePasswordModal" 
                      class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Password Form -->
            <form @submit.prevent="handlePasswordChange" class="p-6 space-y-6">
              <!-- Current Password -->
              <div class="relative group">
                <label for="oldPassword" class="block text-sm font-bold text-gray-700 mb-2 flex items-center space-x-2">
                  <span>Mật khẩu hiện tại</span>
                </label>
                <div class="relative">
                  <input
                    id="oldPassword"
                    v-model="passwordForm.oldPassword"
                    :type="showOldPassword ? 'text' : 'password'"
                    :class="[
                      'w-full pl-5 pr-12 py-4 bg-white/80 backdrop-blur-sm border rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl',
                      passwordErrors.oldPassword 
                        ? 'border-red-400 focus:ring-4 focus:ring-red-500/20 focus:border-red-400' 
                        : 'border-gray-200 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-400'
                    ]"
                    placeholder="Nhập mật khẩu hiện tại"
                    required
                  />
                  <button
                    type="button"
                    @click="showOldPassword = !showOldPassword"
                    class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    
                  </button>
                </div>
                <p v-if="passwordErrors.oldPassword" class="mt-2 text-sm text-red-600 flex items-center space-x-1">
          
                  <span>{{ passwordErrors.oldPassword }}</span>
                </p>
              </div>

              <!-- New Password -->
              <div class="relative group">
                <label for="newPassword" class="block text-sm font-bold text-gray-700 mb-2 flex items-center space-x-2">
              
                  <span>Mật khẩu mới</span>
                </label>
                <div class="relative">
                  <input
                    id="newPassword"
                    v-model="passwordForm.newPassword"
                    :type="showNewPassword ? 'text' : 'password'"
                    :class="[
                      'w-full pl-5 pr-12 py-4 bg-white/80 backdrop-blur-sm border rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl',
                      passwordErrors.newPassword 
                        ? 'border-red-400 focus:ring-4 focus:ring-red-500/20 focus:border-red-400' 
                        : 'border-gray-200 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-400'
                    ]"
                    placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
                    required
                    minlength="6"
                  />
                  <button
                    type="button"
                    @click="showNewPassword = !showNewPassword"
                    class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    
                  </button>
                </div>
                <p v-if="passwordErrors.newPassword" class="mt-2 text-sm text-red-600 flex items-center space-x-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span>{{ passwordErrors.newPassword }}</span>
                </p>
                <div class="mt-2 text-xs text-gray-500">
                  <p class="flex items-center space-x-1">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Mật khẩu phải có ít nhất 6 ký tự</span>
                  </p>
                </div>
              </div>

              <!-- Confirm Password -->
              <div class="relative group">
                <label for="confirmPassword" class="block text-sm font-bold text-gray-700 mb-2 flex items-center space-x-2">
                  <span>Xác nhận mật khẩu mới</span>
                </label>
                <div class="relative">
                  <input
                    id="confirmPassword"
                    v-model="passwordForm.confirmPassword"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    :class="[
                      'w-full pl-5 pr-12 py-4 bg-white/80 backdrop-blur-sm border rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl',
                      passwordErrors.confirmPassword 
                        ? 'border-red-400 focus:ring-4 focus:ring-red-500/20 focus:border-red-400' 
                        : 'border-gray-200 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-400'
                    ]"
                    placeholder="Nhập lại mật khẩu mới"
                    required
                  />
                  
                  <button
                    type="button"
                    @click="showConfirmPassword = !showConfirmPassword"
                    class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    
                  </button>
                </div>
                <p v-if="passwordErrors.confirmPassword" class="mt-2 text-sm text-red-600 flex items-center space-x-1">
                  
                  <span>{{ passwordErrors.confirmPassword }}</span>
                </p>
              </div>

              <!-- Action buttons -->
              <div class="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  @click="resetPasswordForm"
                  class="px-6 py-3 bg-white/90 backdrop-blur-sm hover:bg-white border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  :disabled="passwordLoading"
                  class="group relative inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:transform-none"
                >
                  <div class="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <div class="relative flex items-center space-x-2">
                    <svg v-if="passwordLoading" class="w-5 h-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{{ passwordLoading ? 'Đang xử lý...' : 'Đổi mật khẩu' }}</span>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Component (for confirmations) -->
    <div v-if="showModal" 
         class="fixed inset-0 bg-black/60 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4"
         @click="showModal = false">
      <div class="relative w-full max-w-md transform transition-all duration-300 ease-out" @click.stop>
        <div class="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-75"></div>
        <div class="relative backdrop-blur-xl bg-white/95 rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <!-- Modal Header -->
          <div class="flex items-center justify-between p-6 border-b border-gray-200/50 bg-gradient-to-r from-gray-50/90 to-blue-50/90">
            <div class="flex items-center space-x-3">
              <div :class="[
                'w-10 h-10 rounded-xl flex items-center justify-center shadow-lg',
                modalType === 'success' ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                modalType === 'error' ? 'bg-gradient-to-r from-red-500 to-pink-600' :
                'bg-gradient-to-r from-yellow-500 to-orange-600'
              ]">
                <svg v-if="modalType === 'success'" class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <svg v-else-if="modalType === 'error'" class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <svg v-else class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 class="text-lg font-bold text-gray-900">{{ titleModal }}</h3>
            </div>
            <button @click="showModal = false" 
                    class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Modal Content -->
          <div class="p-6">
            <p class="text-gray-700 text-center">{{ message }}</p>
          </div>

          <!-- Modal Footer -->
          <div class="flex justify-end space-x-3 p-6 border-t border-gray-200/50 bg-gradient-to-r from-gray-50/90 to-blue-50/90">
            <button @click="showModal = false"
                    class="px-6 py-2 bg-white/90 backdrop-blur-sm hover:bg-white border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// Composables
const { $api } = useNuxtApp()
const authStore = useAuthStore()
const route = useRoute()

// Profile reactive data
const loading = ref(true)
const updating = ref(false)
const isEditing = ref(false)
const userInfo = ref({})
const formData = ref({})
const originalData = ref({})
const selectedFile = ref(null)
const imagePreview = ref(null)
const fileInput = ref(null)
const errors = ref({})

// Password change modal data
const showPasswordModal = ref(false)
const passwordLoading = ref(false)
const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})
const passwordErrors = reactive({})
const showOldPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

// Modal state
const showModal = ref(false)
const modalType = ref('success') // 'success', 'error', 'confirm'
const titleModal = ref('')
const message = ref('')
const confirmText = ref('Xác nhận')

// Fetch user profile info
const fetchUserProfile = async () => {
  try {
    loading.value = true
    const response = await $api.get('/students/myInfo')
    userInfo.value = response.data

    // Initialize form data
    formData.value = {
      hoTen: userInfo.value.hoTen || '',
      sdt: userInfo.value.sdt || '',
      lop: userInfo.value.lop || '',
      khoa: userInfo.value.khoa || null,
      gioiTinh: userInfo.value.gioiTinh || '',
      ngaySinh: userInfo.value.ngaySinh
        ? formatDateForInput(userInfo.value.ngaySinh)
        : '',
    }

    // Keep original data for cancel functionality
    originalData.value = { ...formData.value }
  } catch (error) {
    console.error('Error fetching user profile:', error)
    showModalConfirm({
      type: 'ERROR',
      message: 'Có lỗi khi tải thông tin người dùng'
    })
  } finally {
    loading.value = false
  }
}

// Format date for input field (YYYY-MM-DD)
const formatDateForInput = (dateString) => {
  const date = new Date(dateString)
  return date.toISOString().split('T')[0]
}

// Format file size
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Start editing mode
const startEditing = () => {
  isEditing.value = true
  errors.value = {}
}

// Cancel editing
const cancelEditing = () => {
  isEditing.value = false
  formData.value = { ...originalData.value }
  clearImageSelection()
  errors.value = {}
}

// Handle file selection for avatar
const triggerFileUpload = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (!file) return

  // Validate file type
  if (!file.type.startsWith('image/')) {
    showModalConfirm({
      type: 'ERROR',
      message: 'Vui lòng chọn file hình ảnh'
    })
    return
  }

  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    showModalConfirm({
      type: 'ERROR',
      message: 'File ảnh không được vượt quá 5MB'
    })
    return
  }

  selectedFile.value = file

  // Create preview
  const reader = new FileReader()
  reader.onload = (e) => {
    imagePreview.value = e.target.result
  }
  reader.readAsDataURL(file)

  // Reset input value to allow selecting the same file again
  event.target.value = ''
}

// Clear image selection
const clearImageSelection = () => {
  selectedFile.value = null
  imagePreview.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// Validate form data
const validateForm = () => {
  errors.value = {}
  let isValid = true

  // Validate họ tên
  const hoTen = formData.value.hoTen?.trim()
  if (!hoTen || hoTen.length < 2) {
    errors.value.hoTen = 'Họ tên phải từ 2 ký tự trở lên'
    isValid = false
  } else if (!/^[\p{L}\s]+$/u.test(hoTen)) {
    errors.value.hoTen = 'Họ tên chỉ được chứa chữ cái và khoảng trắng'
    isValid = false
  } else if (hoTen.length > 100) {
    errors.value.hoTen = 'Họ tên không được quá 100 ký tự'
    isValid = false
  }

  // Validate SĐT
  const sdt = formData.value.sdt?.trim()
  if (!sdt) {
    errors.value.sdt = 'Số điện thoại không được để trống'
    isValid = false
  } else if (!/^(03|05|07|08|09)[0-9]{8}$/.test(sdt)) {
    errors.value.sdt = 'Số điện thoại không hợp lệ (10 số, bắt đầu bằng 03,05,07,08,09)'
    isValid = false
  }

  // Validate lớp (optional)
  const lop = formData.value.lop?.trim()
  if (lop && !/^[A-Z0-9\-_]+$/i.test(lop)) {
    errors.value.lop = 'Lớp chỉ được chứa chữ cái, số và dấu gạch ngang'
    isValid = false
  } else if (lop && lop.length > 20) {
    errors.value.lop = 'Tên lớp không được quá 20 ký tự'
    isValid = false
  }

  // Validate khóa (optional)
  if (formData.value.khoa !== null && formData.value.khoa !== undefined) {
    const khoa = parseInt(formData.value.khoa)
    if (isNaN(khoa) || khoa < 1 || khoa > 50) {
      errors.value.khoa = 'Khóa phải là số từ 1 đến 50'
      isValid = false
    }
  }

  // Validate ngày sinh (optional)
  if (formData.value.ngaySinh) {
    const birthDate = new Date(formData.value.ngaySinh)
    const today = new Date()
    const age = today.getFullYear() - birthDate.getFullYear()

    if (birthDate >= today) {
      errors.value.ngaySinh = 'Ngày sinh phải là ngày trong quá khứ'
      isValid = false
    } else if (age > 100) {
      errors.value.ngaySinh = 'Ngày sinh không hợp lệ'
      isValid = false
    } else if (age < 15) {
      errors.value.ngaySinh = 'Tuổi phải từ 15 trở lên'
      isValid = false
    }
  }

  // Validate giới tính (optional)
  if (
    formData.value.gioiTinh &&
    !['Nam', 'Nữ', 'Khác'].includes(formData.value.gioiTinh)
  ) {
    errors.value.gioiTinh = 'Giới tính không hợp lệ'
    isValid = false
  }

  // Validate file (nếu có)
  if (selectedFile.value) {
    const file = selectedFile.value
    const maxSize = 5 * 1024 * 1024 // 5MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']

    if (!allowedTypes.includes(file.type)) {
      showModalConfirm({
        type: 'ERROR',
        message: 'Chỉ chấp nhận file ảnh định dạng JPEG, PNG, GIF'
      })
      isValid = false
    } else if (file.size > maxSize) {
      showModalConfirm({
        type: 'ERROR',
        message: 'File ảnh không được vượt quá 5MB'
      })
      isValid = false
    }
  }

  return isValid
}

// Show modal confirmation (similar to change password page)
const showModalConfirm = (element) => {
  switch (element.type) {
    case 'ERROR':
      modalType.value = 'error'
      titleModal.value = 'Lỗi'
      message.value = element.message
      confirmText.value = 'Đóng'
      showModal.value = true
      break
      
    case 'SUCCESS':
      modalType.value = 'success'
      titleModal.value = 'Thành công'
      message.value = element.message
      confirmText.value = 'Đóng'
      showModal.value = true
      break
      
    default:
      modalType.value = 'confirm'
      titleModal.value = 'Xác nhận'
      message.value = element.message
      confirmText.value = 'Xác nhận'
      showModal.value = true
  }
}

// Handle form submission
const handleSubmit = async () => {
  if (!validateForm()) {
    showModalConfirm({
      type: 'ERROR',
      message: 'Vui lòng kiểm tra lại thông tin'
    })
    return
  }

  try {
    updating.value = true
    
    // Check if file is selected
    if (selectedFile.value) {
      // Case with file upload - use FormData
      const submitData = new FormData()

      const studentData = {
        hoTen: formData.value.hoTen.trim(),
        sdt: formData.value.sdt.trim(),
        lop: formData.value.lop?.trim()?.toUpperCase() || null,
        khoa: formData.value.khoa || null,
        gioiTinh: formData.value.gioiTinh || null,
        ngaySinh: formData.value.ngaySinh || null,
        image: {
          thuTu: 1,
          loaiAnh: 'Đại diện',
          chuSoHuu: 'Người dùng',
        },
      }

      // Append file
      submitData.append('files', selectedFile.value)

      // Append JSON data
      submitData.append(
        'student',
        new Blob([JSON.stringify(studentData)], { type: 'application/json' })
      )

      const response = await $api.patch(
        `/students/${userInfo.value.mssv}`,
        submitData,
        {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        }
      )

      showModalConfirm({
        type: 'SUCCESS',
        message: response.data.message || 'Cập nhật thông tin thành công!'
      })
    } else {
      // Case without file upload - use JSON
      const studentData = {
        hoTen: formData.value.hoTen.trim(),
        sdt: formData.value.sdt.trim(),
        lop: formData.value.lop?.trim()?.toUpperCase() || null,
        khoa: formData.value.khoa || null,
        gioiTinh: formData.value.gioiTinh || null,
        ngaySinh: formData.value.ngaySinh || null,
      }

      const response = await $api.patch(
        `/students/${userInfo.value.mssv}`,
        studentData,
        {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      showModalConfirm({
        type: 'SUCCESS',
        message: response.data.message || 'Cập nhật thông tin thành công!'
      })
    }

    isEditing.value = false
    clearImageSelection()
    await fetchUserProfile()
  } catch (error) {
    console.error('Error updating profile:', error)
    let errorMessage = 'Có lỗi khi cập nhật thông tin'
    
    if (error.response) {
      if (error.response.status === 400) {
        errorMessage = error.response.data.message || 'Thông tin không hợp lệ'
      } else if (error.response.status === 401) {
        errorMessage = 'Bạn không có quyền thực hiện thao tác này'
      } else if (error.response.status === 404) {
        errorMessage = 'Không tìm thấy thông tin người dùng'
      } else {
        errorMessage = error.response.data.message || 'Lỗi hệ thống'
      }
    }
    
    showModalConfirm({
      type: 'ERROR',
      message: errorMessage
    })
  } finally {
    updating.value = false
  }
}

// Password validation
const validatePasswordForm = () => {
  // Clear previous errors
  Object.keys(passwordErrors).forEach(key => delete passwordErrors[key])
  
  // Validate old password
  if (!passwordForm.oldPassword) {
    passwordErrors.oldPassword = 'Vui lòng nhập mật khẩu hiện tại'
  }
  
  // Validate new password
  if (!passwordForm.newPassword) {
    passwordErrors.newPassword = 'Vui lòng nhập mật khẩu mới'
  } else if (passwordForm.newPassword.length < 6) {
    passwordErrors.newPassword = 'Mật khẩu mới phải có ít nhất 6 ký tự'
  } else if (passwordForm.newPassword === passwordForm.oldPassword) {
    passwordErrors.newPassword = 'Mật khẩu mới không được giống mật khẩu cũ'
  }
  
  // Validate confirm password
  if (!passwordForm.confirmPassword) {
    passwordErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu mới'
  } else if (passwordForm.confirmPassword !== passwordForm.newPassword) {
    passwordErrors.confirmPassword = 'Mật khẩu xác nhận không khớp'
  }
  
  return Object.keys(passwordErrors).length === 0
}

// Handle password change (following the pattern from change password page)
const handlePasswordChange = async () => {
  if (!validatePasswordForm()) {
    return
  }
  
  passwordLoading.value = true
  
  try {
    // Create FormData for the API call (following the controller pattern)
    const formData = new FormData()
    formData.append('oldPassword', passwordForm.oldPassword)
    formData.append('newPassword', passwordForm.newPassword)
    
    // API call to change password
    const response = await $api.post(`/students/changePassword/${userInfo.value.mssv}`, formData)
    
    // Handle success response
    if (response.data.success) {
      showModalConfirm({
        type: 'SUCCESS',
        message: response.data.message || 'Đổi mật khẩu thành công!'
      })
      resetPasswordForm()
      closePasswordModal()
    } else {
      showModalConfirm({
        type: 'ERROR',
        message: response.data.message || 'Có lỗi xảy ra khi đổi mật khẩu'
      })
    }
    
  } catch (error) {
    console.error('Error changing password:', error)
    
    // Handle different error types
    let errorMessage = 'Có lỗi xảy ra khi đổi mật khẩu'
    
    if (error.response) {
      if (error.response.status === 400) {
        errorMessage = error.response.data.message || 'Thông tin không hợp lệ'
      } else if (error.response.status === 401) {
        errorMessage = 'Mật khẩu hiện tại không chính xác'
      } else if (error.response.status === 404) {
        errorMessage = 'Không tìm thấy tài khoản'
      } else {
        errorMessage = error.response.data.message || 'Lỗi hệ thống'
      }
    }
    
    showModalConfirm({
      type: 'ERROR',
      message: errorMessage
    })
    
  } finally {
    passwordLoading.value = false
  }
}

// Reset password form
const resetPasswordForm = () => {
  passwordForm.oldPassword = ''
  passwordForm.newPassword = ''
  passwordForm.confirmPassword = ''
  
  // Clear errors
  Object.keys(passwordErrors).forEach(key => delete passwordErrors[key])
  
  showOldPassword.value = false
  showNewPassword.value = false
  showConfirmPassword.value = false
}

// Close password modal
const closePasswordModal = () => {
  showPasswordModal.value = false
  resetPasswordForm()
}

// Initialize on mounted
onMounted(() => {
  fetchUserProfile()
})
</script>

<style scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.animation-delay-150 {
  animation-delay: 150ms;
}

/* Glass morphism utilities */
.backdrop-blur-lg {
  backdrop-filter: blur(16px);
}

.backdrop-blur-xl {
  backdrop-filter: blur(24px);
}

.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

/* Custom focus styles */
input:focus {
  outline: none;
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Hover effects */
.transform:hover {
  transform: translateY(-2px);
}

/* Loading animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Custom scrollbar for better appearance */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter,
    backdrop-filter;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>