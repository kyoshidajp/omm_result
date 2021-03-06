class Result < ApplicationRecord
  has_many :result_players, dependent: :destroy
  has_many :players, -> { distinct }, through: :result_players
  has_many :result_controls, dependent: :destroy
  has_many :controls, -> { order('result_controls.created_at ASC') }, through: :result_controls
  belongs_to :category
end
