return {
  {
    "mason-org/mason.nvim",
    opts = {
      ensure_installed = { "prettier" },
    },
  },
  {
    "mcookly/bidi.nvim",
    opts = {
      default_base_direction = "LR",
    },
  },
  -- {
  --   "stevearc/conform.nvim",
  --   formatters = {
  --     biome = {
  --       command = vim.fn.exepath("biome"),
  --     },
  --   },
  -- },
}
